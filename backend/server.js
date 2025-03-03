// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const courseRoutes = require('./Routes/courseRoutes.js');
const userRoutes = require('./Routes/userRoutes.js');
const engagementRoutes = require('./Routes/engagementRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Define API routes
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/engagements', engagementRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
