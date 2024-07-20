//app.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

connectDB();

// Middleware
app.use(express.json());

// Configure CORS to allow requests from your frontend origin
app.use(
    cors({
        origin: ["http://localhost:3000", "https://https://cliniclogs.netlify.app/"],
        methods: "GET,HEAD,PUT,PATCH,UPDATE,POST,DELETE",
        credentials: true,
    })
);

// Import and use routes directly
// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/logs', require('./routes/logs'));
app.use('/api/users', require('./routes/users'));

// Error handling middleware
// Error handling middleware
app.use(errorHandler);


// Start the server
const PORT = process.env.PORT_MAIN || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
