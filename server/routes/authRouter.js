const express = require('express');
const {  currentUserController, registerController, loginController } = require('../controllers/authControllers');
const authmiddelware = require('../middlewares/authmiddelware');
const dotenv = require('dotenv')
dotenv.config()

const router = express.Router();

// register route post
router.post('/register' , registerController );

// login route post
router.post('/login', loginController)

// getcurrentuser || get

router.get('/current-user' ,authmiddelware, currentUserController)




module.exports = router