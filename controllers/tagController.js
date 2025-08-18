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
    try {
        const { name, description } = req.body;

        // Validate required fields
        if (!name) {
            return res.status(400).json({ 
                message: 'Name is required',
                missingFields: ['name']
            });
        }

        // Validate field types
        if (typeof name !== 'string') {
            return res.status(400).json({ 
                message: 'Name must be a string',
                field: 'name'
            });
        }
        if (description !== undefined && typeof description !== 'string') {
            return res.status(400).json({ 
                message: 'Description must be a string',
                field: 'description'
            });
        }

        const tag = new Tag(req.body);
        const newTag = await tag.save();
        const location = `/tags/${newTag._id}`;
        res.location(location);
        res.status(201).json(newTag);
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({ 
                message: `${field} already exists`,
                field
            });
        }
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

exports.patchTag = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validate field types if they exist
        if (name !== undefined && typeof name !== 'string') {
            return res.status(400).json({ 
                message: 'Name must be a string',
                field: 'name'
            });
        }
        if (description !== undefined && typeof description !== 'string') {
            return res.status(400).json({ 
                message: 'Description must be a string',
                field: 'description'
            });
        }

        const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (tag) {
            res.status(200).json(tag);
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({ 
                message: `${field} already exists`,
                field
            });
        }
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
