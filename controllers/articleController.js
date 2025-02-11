const Article = require('../models/Article');

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate('tags');
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createArticle = async (req, res) => {
    const article = new Article(req.body);
    try {
        const newArticle = await article.save();
        const location = `/articles/${newArticle._id}`;
        res.location(location);
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('tags');
        if (article) {
            res.status(200).json(article);
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (article) {
            res.status(200).json(article);
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (article) {
            res.status(200).json({ message: 'Article deleted successfully' });
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
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
