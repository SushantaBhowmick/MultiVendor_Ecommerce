const express = require('express');
const router = express.Router();
const { upload } = require('../multer');
const { register } = require('../controller/user');

router.route("/create-user").post(upload.single("file"),register)

module.exports = router;