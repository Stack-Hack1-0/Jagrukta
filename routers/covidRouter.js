const express = require('express');
const router = express.Router();

const covidController = require('../controllers/covidController');

router.post('/check',covidController.postCheck);

router.get('/news',covidController.getNews);

module.exports = router;