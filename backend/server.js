require('dotenv').config(); 
const PORT = process.env.PORT || 2500;
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db'); 
const { autoSeedIfEmpty } = require('./services/autoSeed');

const app = express();

// Connect to MongoDB and auto-seed default projects if DB is empty
connectDB()
    .then(() => autoSeedIfEmpty())
    .catch(err => {
        console.error("❌ MongoDB connection failed:", err.message);
    });

app.use(cors()); 
app.use(express.json()); 

const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);
app.use('/projects', projectRoutes);

app.get(['/api/health', '/health'], (req, res) => {
    res.status(200).json({ status: 'ok', serverless: !!process.env.VERCEL });
});

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
