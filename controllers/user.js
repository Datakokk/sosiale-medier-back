const { response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const { BASE_URL, TOKEN_SECRET } = process.env;

const { validateEmail, validateLength, validateUsername } = require('../helpers/validation');
const User = require('../models/User');
const { generateJWT } = require('../helpers/token');
const { sendVerificationEmail } = require('../helpers/mailer');

const register = async (req, res) => {
    console.log(req.body)
    const { 
        first_name,
        last_name,
        username,
        email,
        password,
        gender,
        bYear,
        bMonth,
        bDay,
    } = req.body;

    try {

        if( !validateEmail( email ) ){
            return res.status(400).json({
                message: "invalid email address",
            });
        }
        
        let user = await User.findOne( { email });
        
        if( user ){
            return res.status(400).json({
                ok:false,
                msg: 'User already exists'
            });
        };

        if( !validateLength(first_name, 3, 35)){
            return res.status(400).json({
                ok: false,
                msg: 'first name must be between 3 and 35 characters.'
            });
        };

        if( !validateLength(last_name, 3, 35)){
            return res.status(400).json({
                ok: false,
                msg: 'last name must be between 3 and 35 characters.'
            });
        };

        if( !validateLength(password, 3, 35)){
            return res.status(400).json({
                ok: false,
                msg: 'password must be between 3 and 35 characters.'
            });
        };

        // Create a user
        user = new User( req.body );
        
        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        // Username
        user.username = first_name + last_name;
        user.username = await validateUsername(user.username, user.email);


        // Storing in the database
        await user.save();

        // Create JSON Token for email verification
        const emailVerificationToken = await generateJWT({id:user.id}, "30m");

        const url = `${ BASE_URL }/activate/${emailVerificationToken}`;

        sendVerificationEmail(user.email, user.first_name, url);

        // Create JSON Token 
        const token = await generateJWT({id:user.id}, "7d");

        res.send({
            id: user.id,
            username: username,
            picture : user.picture,
            first_name: user.first_name,
            last_name: user.last_name,
            token: token,
            verified: user.verified,
            message: "Register Success!! please activate your email to start",
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error.message
        })
    };

};

const activateAccount = async ( req, res ) => {

    try {
        
        const { token } = req.body;
    
        const user = jwt.verify(token, process.env.SECRET_JWT );
    
        const check = await User.findById( user.id );
    
        if( !check.verified ){
            await User.findByIdAndUpdate( user.id, { verified: true });
    
            return res.status(200).json({
                message: "Account has been activated successfully"
            });
        }else {
            
            return res.status(400).json({
                message: "This email is already activated"
            })
        };

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error.message
        })  
    };
};

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'The email address you entered is not connected to an account.',
            });
        };

        // Check password
        const validPassword = bcrypt.compareSync( password, user.password );
        
        if( !validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid credentials. Please try again',
            });
        };

        // Create a JSON web token.
        const token = await generateJWT({id: user.id}, "7d");

        res.json({
            ok: true,
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
}

module.exports = {
    register,
    activateAccount,
    loginUser
}