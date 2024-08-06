const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');

router.post('/borrow', bookController.borrowBook);
router.post('/return', bookController.returnBook);
router.get('/available-books', bookController.checkAvailableBooks);
router.get('/members', bookController.checkMembers);

module.exports = router;
