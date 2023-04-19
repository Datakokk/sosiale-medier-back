const { default: mongoose } = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewURlParser: true,
        });

        console.log('DB_online connected successfully og alt er greit!!!');

    } catch (error) {
        console.log(error);
        throw new Error('Error when initialization BD');
    }
};

module.exports = {
    dbConnection,
}