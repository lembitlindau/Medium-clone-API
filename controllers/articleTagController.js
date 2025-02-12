const Article = require('../models/Article');
const { OK, CREATED, NO_CONTENT, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('../utils/httpResponses');

exports.getArticleTags = async (req, res) => {
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
            data: article.tags
        });
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR.code).json({
            status: INTERNAL_SERVER_ERROR.code,
            message: INTERNAL_SERVER_ERROR.message,
            error: error.message
        });
    }
};

exports.addArticleTags = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(NOT_FOUND.code).json({
                status: NOT_FOUND.code,
                message: 'Article not found'
            });
        }

        const { tags } = req.body;
        if (!Array.isArray(tags)) {
            return res.status(UNPROCESSABLE_ENTITY.code).json({
                status: UNPROCESSABLE_ENTITY.code,
                message: 'Tags must be an array of tag IDs'
            });
        }

        article.tags = [...new Set([...article.tags, ...tags])];
        const updatedArticle = await article.save();
        res.status(OK.code).json({
            status: OK.code,
            message: 'Tags added successfully',
            data: updatedArticle.tags
        });
    } catch (error) {
        res.status(BAD_REQUEST.code).json({
            status: BAD_REQUEST.code,
            message: BAD_REQUEST.message,
            error: error.message
        });
    }
};

exports.removeArticleTags = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(NOT_FOUND.code).json({
                status: NOT_FOUND.code,
                message: 'Article not found'
            });
        }

        const { tags } = req.body;
        if (!Array.isArray(tags)) {
            return res.status(UNPROCESSABLE_ENTITY.code).json({
                status: UNPROCESSABLE_ENTITY.code,
                message: 'Tags must be an array of tag IDs'
            });
        }

        article.tags = article.tags.filter(tag => !tags.includes(tag.toString()));
        const updatedArticle = await article.save();
        res.status(OK.code).json({
            status: OK.code,
            message: 'Tags removed successfully',
            data: updatedArticle.tags
        });
    } catch (error) {
        res.status(BAD_REQUEST.code).json({
            status: BAD_REQUEST.code,
            message: BAD_REQUEST.message,
            error: error.message
        });
    }
};
