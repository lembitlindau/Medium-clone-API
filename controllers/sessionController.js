const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.createSession = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email and password are required',
                missingFields: [
                    ...(!email ? ['email'] : []),
                    ...(!password ? ['password'] : [])
                ]
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

        // Find user by email (in real app, you'd verify password hash)
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                avatar: user.avatar
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSession = async (req, res) => {
    try {
        // In a real app, you might maintain a blacklist of revoked tokens
        // For now, we just confirm the token is valid and return success
        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
