const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const tagRoutes = require('./routes/tagRoutes');
const articleTagRoutes = require('./routes/articleTagRoutes');

const app = express();
const port = process.env.PORT || 9999;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Routes
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
app.use('/tags', tagRoutes);
app.use('/', articleTagRoutes); // Article-tag relationship routes

// Import and use the Swagger configuration
require('./swagger')(app);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
});