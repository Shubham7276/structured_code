// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const fileController = require('../Controller/file.controller');

// Upload a file
router.post('/upload', fileController.uploadFile);

module.exports = router;
