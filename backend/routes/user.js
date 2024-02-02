const express = require('express');
const router = express.Router();
const { upload } = require('../multer');
const { 
    register, 
    activation, 
    login, 
    loadUser, 
    logout
} = require('../controller/user');
const { isAuthenticated } = require('../middleware/auth');


router.route("/create-user").post(upload.single("file"),register);
router.route("/activation").post(activation);
router.route("/login").post(login);
router.route("/me").get(isAuthenticated,loadUser);
router.route("/logout").get(isAuthenticated,logout);


module.exports = router;