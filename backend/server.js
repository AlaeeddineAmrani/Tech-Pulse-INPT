require('dotenv').config(); 
const PORT = process.env.PORT || 2500;
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db'); 

const app = express();

// Connect to MongoDB (don't crash the serverless function if it fails)
connectDB().catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
});

app.use(cors()); 
app.use(express.json()); 

const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

// Only start cron workers and listen when NOT running as a serverless function
// Vercel sets VERCEL=1 in its environment
if (!process.env.VERCEL) {
    const { demarrerWorker, initScheduler } = require('./services/worker'); 
    const { initPredictionJobs } = require('./jobs/dailyCron');

    demarrerWorker();
    initScheduler();
    initPredictionJobs();

    app.listen(PORT, () => {
        console.log(`Le serveur tourne sur le port ${PORT}`);
    });
}

module.exports = app;
