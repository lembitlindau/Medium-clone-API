const Tag = require('../models/Tag');

exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTag = async (req, res) => {
    const tag = new Tag(req.body);
    try {
        const newTag = await tag.save();
        const location = `/tags/${newTag._id}`;
        res.location(location);
        res.status(201).json(newTag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTag = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);
        if (tag) {
            res.status(200).json(tag);
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTag = async (req, res) => {
    try {
        const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (tag) {
            res.status(200).json(tag);
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findByIdAndDelete(req.params.id);
        if (tag) {
            res.status(200).json({ message: 'Tag deleted successfully' });
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
