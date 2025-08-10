require('dotenv').config();
const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../build')));

// Handle all other routes with regex wildcard
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`inotebook backend listening on port ${port}`);
});
