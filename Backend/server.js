const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const carRoutes = require('./routes/carRoutes');
app.use('/cars', carRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('CarGarage API is running...');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });