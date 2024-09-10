// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
const articleRoutes = require('./routes/articles');
const authorRoutes = require('./routes/authors');
app.use('/api/articles', articleRoutes);
app.use('/api/authors', authorRoutes);
app.use('/',

  (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
  }

)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
