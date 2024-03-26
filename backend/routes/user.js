const express = require('express');
const router = express.Router();
const { upload } = require('../multer');
const { 
    register, 
    activation, 
    login, 
    loadUser, 
    logout,
    updateUserInfo,
    updateUserAvatar,
    updateUseraddress,
    deleteUseraddress,
    updateUserPassword
} = require('../controller/user');
const { isAuthenticated } = require('../middleware/auth');


router.route("/create-user").post(upload.single("file"),register);
router.route("/activation").post(activation);
router.route("/login").post(login);
router.route("/me").get(isAuthenticated,loadUser);
router.route("/logout").get(isAuthenticated,logout);
router.route("/update-user-info").put(isAuthenticated,updateUserInfo);
router.route("/update-user-avatar").put(isAuthenticated,upload.single("image"), updateUserAvatar);
router.route("/update-user-addresses").put(isAuthenticated, updateUseraddress);
router.route("/delete-user-address/:id").delete(isAuthenticated, deleteUseraddress);
router.route("/update-user-password").put(isAuthenticated, updateUserPassword);


module.exports = router;