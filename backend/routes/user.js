const express = require('express');
const router = express.Router();
const { upload } = require('../multer');
const { register, activation } = require('../controller/user');


router.route("/create-user").post(upload.single("file"),register);
router.route("/activation").post(activation);


module.exports = router;