const express = require('express');
const { upload } = require('../multer');
const { isSeller } = require('../middleware/auth');
const { createEvent, getAllEventsShop, deleteEventShop, getAllEvents } = require('../controller/event');
const router = express.Router();

router.route('/create-event').post(isSeller,upload.array("images"), createEvent)
router.route('/get-all-events-shop/:id').get(getAllEventsShop)
router.route('/delete-shop-event/:id').delete(isSeller, deleteEventShop)
router.route('/get-all-events').get(getAllEvents)

module.exports = router;