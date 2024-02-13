const express = require('express');
const { upload } = require('../multer');
const { isSeller } = require('../middleware/auth');
const { createEvent } = require('../controller/event');
const router = express.Router();

router.route('/create-event').post(isSeller,upload.array("images"), createEvent)

module.exports = router;