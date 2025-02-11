const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const tagController = require('../controllers/tagController');

router.get('/', tagController.getAllTags);
router.post('/', authenticateToken, tagController.createTag);
router.get('/:id', tagController.getTag);
router.put('/:id', authenticateToken, tagController.updateTag);
router.delete('/:id', authenticateToken, tagController.deleteTag);

module.exports = router;
