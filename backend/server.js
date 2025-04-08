const express = require('express');
require('dotenv').config();
const userRoutes = require('./src/routes/user.routes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use('/uploads', express.static('uploads/users')); // Serve images
app.use('/', userRoutes); // Use actual routes

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

  