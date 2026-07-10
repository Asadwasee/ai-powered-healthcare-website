import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import dns, { setServers } from 'dns';
// Import routes
import authRoutes from './routes/authRoutes.js';
import labRoutes from './routes/labRoutes.js';
import emergencyRoutes from './routes/emergencyRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5001;

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(' MongoDB Connected'))
    .catch(err => console.log(' MongoDB Error:', err.message));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(multer().any()); 

// Routes
app.use('/api/auth', authRoutes);   //testing done 
app.use('/api/lab', labRoutes); //testing done 
app.use('/api/emergency', emergencyRoutes);  //testing done
app.use('/api/blogs', blogRoutes);  //testing done 

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        server: 'Running',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
    });
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});