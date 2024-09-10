// routes/articles.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Article = require('../models/Article');
const Author = require('../models/Author');
const router = express.Router();

// Middleware for authorization
const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.authorId = decoded.authorId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get all articles
router.get('/', async (req, res) => {
  const { authorId, tags } = req.query;
  const filter = {};
  if (authorId) filter.author = authorId;
  if (tags) filter.tags = { $in: tags.split(',') };

  try {
    const articles = await Article.find(filter).populate('author', 'name');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create an article
router.post('/', auth, async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const article = new Article({
      title,
      content,
      tags,
      author: req.authorId
    });

    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit an article 
router.put('/:id', auth, async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    let article = await Article.findById(req.params.id);
    if (!article || article.author.toString() !== req.authorId) return res.status(403).json({ message: 'Not authorized' });

    article.title = title || article.title;
    article.content = content || article.content;
    article.tags = tags || article.tags;

    await article.save();
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an article
router.delete('/:id', auth, async (req, res) => {
  try {
    let article = await Article.findById(req.params.id);
    if (!article || article.author.toString() !== req.authorId) return res.status(403).json({ message: 'Not authorized' });

    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Article removed' });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/my-articles', auth, async (req, res) => {
  try {
    const articles = await Article.find({ author: req.authorId }).populate('author', 'name');
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Get article by author
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'name');
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
