const express = require('express');
const { register, activateAccount, loginUser } = require('../controllers/user');
 
const router = express.Router();

router.post('/register', register);
router.post('/activate', activateAccount);
router.post('/login', loginUser );

module.exports = router;



