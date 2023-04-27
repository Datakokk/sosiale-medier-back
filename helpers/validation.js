const { generateFromEmail } = require("unique-username-generator");
const User = require("../models/User");

const validateEmail = ( email ) => {
     
    return String(email)
            .toLowerCase()
            .match(/([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

const validateLength = (text, min, max) => {
    return ( text.length > max || text.length < min ) ? false : true;
};

const validateUsername = async ( username, email ) => {
    let flag = false;

    do {
        let check = await User.findOne({ username });
        if( check ){
            // change username
            username = generateFromEmail(email, 3);
            //username += (+new Date() + Math.random()).toString().substring( 0, 5 );

            flag = true;
            
        }else {
            flag = false;
        };

    } while ( flag );

    return username;
}


module.exports = {
    validateEmail,
    validateLength,
    validateUsername
}