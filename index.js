const express = require('express');
const app = express();
const port = 9999;

app.get('/', (req, res) => {
    res.send('Hello World!');
});




// Import and use the Swagger configuration
require('./swagger')(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
});