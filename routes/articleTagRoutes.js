const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const articleTagController = require('../controllers/articleTagController');

// Article-Tag relationship routes
router.get('/articles/:id/tags', articleTagController.getArticleTags);
router.post('/articles/:id/tags', authenticateToken, articleTagController.addArticleTags);
router.delete('/articles/:id/tags', authenticateToken, articleTagController.removeArticleTags);

module.exports = router;
