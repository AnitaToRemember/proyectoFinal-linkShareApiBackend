//Importing dependencies
const express = require('express');
const router = express.Router();


//Importing final controller functions
const {
    registerUserControllers,
    loginUserController,
    getOwnUserController,
    editUserPassController,
    sendRecoverPassController,
    updatePasswordWithCodeController,
    editUserAvatarController,
} = require('../controllers/users');

//Importing intermediate controller functions 
const { authUser, userExists } = require('../middlewares');

// User register
router.post('/users/register', registerUserControllers);

//User login
router.post('/users/login', loginUserController);

// Info user token
router.get('/users', authUser, userExists, getOwnUserController);

// Change pwd
router.put('/users/password', authUser, userExists, editUserPassController);

// required temporary code to change the pass
router.post('/users/password/recover', sendRecoverPassController); 

// to add new pass
router.put('/users/password/recover', updatePasswordWithCodeController); 

//add avatar
router.patch('/users/avatar', authUser, userExists, editUserAvatarController);

module.exports = router;
