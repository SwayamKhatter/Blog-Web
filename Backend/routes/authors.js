// routes/authors.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const Author = require('../models/Author');
const router = express.Router();

// Register Author
router.post('/register', [
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password is required').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password, bio } = req.body;
  
  try {
    let author = await Author.findOne({ email });
    if (author) return res.status(400).json({ message: 'Author already exists' });

    author = new Author({ name, email, password, bio });
    await author.save();

    const token = jwt.sign({ authorId: author._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Author
router.post('/login', [
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
    
  };

  const { email, password } = req.body;

  try {
    const author = await Author.findOne({ email });
    if (!author) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, author.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ authorId: author._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
