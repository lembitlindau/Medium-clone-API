const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, email, password, bio, avatar } = req.body;

        // Validate required fields
        const missingFields = [];
        if (!username) missingFields.push('username');
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');
        if (!bio) missingFields.push('bio');
        if (!avatar) missingFields.push('avatar');

        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: 'Required fields are missing',
                missingFields
            });
        }

        // Validate field types
        if (typeof username !== 'string') {
            return res.status(400).json({ 
                message: 'Username must be a string',
                field: 'username'
            });
        }
        if (typeof email !== 'string') {
            return res.status(400).json({ 
                message: 'Email must be a string',
                field: 'email'
            });
        }
        if (typeof password !== 'string') {
            return res.status(400).json({ 
                message: 'Password must be a string',
                field: 'password'
            });
        }
        if (typeof bio !== 'string') {
            return res.status(400).json({ 
                message: 'Bio must be a string',
                field: 'bio'
            });
        }
        if (typeof avatar !== 'string') {
            return res.status(400).json({ 
                message: 'Avatar must be a string',
                field: 'avatar'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: 'Invalid email format',
                field: 'email'
            });
        }

        const user = new User(req.body);
        const newUser = await user.save();
        const location = `/users/${newUser._id}`;
        res.location(location);
        res.status(201).json(newUser);
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

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.patchUser = async (req, res) => {
    try {
        // Validate field types if they exist
        const { username, email, bio, avatar, password } = req.body;
        
        if (username !== undefined && typeof username !== 'string') {
            return res.status(400).json({ 
                message: 'Username must be a string',
                field: 'username'
            });
        }
        if (email !== undefined) {
            if (typeof email !== 'string') {
                return res.status(400).json({ 
                    message: 'Email must be a string',
                    field: 'email'
                });
            }
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ 
                    message: 'Invalid email format',
                    field: 'email'
                });
            }
        }
        if (password !== undefined && typeof password !== 'string') {
            return res.status(400).json({ 
                message: 'Password must be a string',
                field: 'password'
            });
        }
        if (bio !== undefined && typeof bio !== 'string') {
            return res.status(400).json({ 
                message: 'Bio must be a string',
                field: 'bio'
            });
        }
        if (avatar !== undefined && typeof avatar !== 'string') {
            return res.status(400).json({ 
                message: 'Avatar must be a string',
                field: 'avatar'
            });
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
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

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
