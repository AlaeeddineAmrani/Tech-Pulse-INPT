// Vercel Serverless Function — wraps the Express app
// Vercel routes every /api/* request here via the rewrite in vercel.json

const app = require('../backend/server');

module.exports = app;
