const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const articleController = require('../controllers/articleController');

router.get('/', articleController.getAllArticles);
router.post('/', authenticateToken, articleController.createArticle);
router.get('/:id', articleController.getArticle);
router.put('/:id', authenticateToken, articleController.updateArticle);
router.delete('/:id', authenticateToken, articleController.deleteArticle);

module.exports = router;
