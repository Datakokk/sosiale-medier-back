const jwt = require("jsonwebtoken");

const generateJWT = ( payload, expiresIn ) => {

    return new Promise( (resolve, reject ) => {

        jwt.sign( payload, process.env.SECRET_JWT, {
            expiresIn,
        }, ( err, token ) => {

            if( err ){
                console.log(err);
                reject("Token can't be generated");
            }; 
            resolve ( token );
        });
    })
};

module.exports = {
    generateJWT, 
}