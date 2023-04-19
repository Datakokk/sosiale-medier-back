const home = (req, res) => {
    res.status(400).json({
        message: 'Welcome from user home og lykke til da!',
        error: 'Some one is wrong, funker ikke!'
    })
    // res.send('Welcome from user home og lykke til daæø!');
};

module.exports = {
    home
}