const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const articleController = require('../controllers/articleController');

router.get('/', articleController.getAllArticles);
router.post('/', authenticateToken, articleController.createArticle);
router.get('/:id', articleController.getArticle);
router.put('/:id', authenticateToken, articleController.updateArticle);
router.delete('/:id', authenticateToken, articleController.deleteArticle);

// Article tags routes
router.get('/:id/tags', articleController.getArticleTags);
router.post('/:id/tags', authenticateToken, articleController.addArticleTags);
router.delete('/:id/tags', authenticateToken, articleController.removeArticleTags);

module.exports = router;
