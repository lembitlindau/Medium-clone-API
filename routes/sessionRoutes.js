const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const sessionController = require('../controllers/sessionController');

router.post('/', sessionController.createSession);
router.delete('/', authenticateToken, sessionController.deleteSession);

module.exports = router;
