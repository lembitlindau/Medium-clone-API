const Article = require('../models/Article');
const { OK, CREATED, NO_CONTENT, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/httpResponses');

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate('tags');
        res.status(OK.code).json({
            status: OK.code,
            message: OK.message,
            data: articles
        });
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR.code).json({
            status: INTERNAL_SERVER_ERROR.code,
            message: INTERNAL_SERVER_ERROR.message,
            error: error.message
        });
    }
};

exports.createArticle = async (req, res) => {
    try {
        const article = new Article(req.body);
        const newArticle = await article.save();
        const location = `/articles/${newArticle._id}`;
        res.location(location);
        res.status(CREATED.code).json({
            status: CREATED.code,
            message: CREATED.message,
            data: newArticle
        });
    } catch (error) {
        res.status(BAD_REQUEST.code).json({
            status: BAD_REQUEST.code,
            message: BAD_REQUEST.message,
            error: error.message
        });
    }
};

exports.getArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('tags');
        if (!article) {
            return res.status(NOT_FOUND.code).json({
                status: NOT_FOUND.code,
                message: 'Article not found'
            });
        }
        res.status(OK.code).json({
            status: OK.code,
            message: OK.message,
            data: article
        });
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR.code).json({
            status: INTERNAL_SERVER_ERROR.code,
            message: INTERNAL_SERVER_ERROR.message,
            error: error.message
        });
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!article) {
            return res.status(NOT_FOUND.code).json({
                status: NOT_FOUND.code,
                message: 'Article not found'
            });
        }
        res.status(OK.code).json({
            status: OK.code,
            message: 'Article updated successfully',
            data: article
        });
    } catch (error) {
        res.status(BAD_REQUEST.code).json({
            status: BAD_REQUEST.code,
            message: BAD_REQUEST.message,
            error: error.message
        });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(NOT_FOUND.code).json({
                status: NOT_FOUND.code,
                message: 'Article not found'
            });
        }
        res.status(NO_CONTENT.code).json({
            status: NO_CONTENT.code,
            message: 'Article deleted successfully'
        });
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR.code).json({
            status: INTERNAL_SERVER_ERROR.code,
            message: INTERNAL_SERVER_ERROR.message,
            error: error.message
        });
    }
};

exports.getArticleTags = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('tags');
        if (article) {
            res.status(200).json(article.tags);
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addArticleTags = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // req.body should be an array of tag IDs
        article.tags = [...new Set([...article.tags, ...req.body])];
        await article.save();
        
        res.status(200).json({ message: 'Tags added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removeArticleTags = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // req.body should be an array of tag IDs to remove
        article.tags = article.tags.filter(tag => !req.body.includes(tag.toString()));
        await article.save();
        
        res.status(200).json({ message: 'Tags removed successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
