const express = require('express');
const upload = require('../middleware/upload.middleware');
const router = express.Router();

const {signup} = require('../controllers/user.controller');

router.post('/signup', upload.single('pfp'), signup);

module.exports = router;