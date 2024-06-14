const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all jokes
router.get('/', async (req, res) => {
  try {
    const jokes = await db.jokes.findAll();
    res.json(jokes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a new joke
router.post('/', async (req, res) => {
  try {
    const joke = await db.jokes.create({ content: req.body.content });
    // log
    console.log('Creating ' + joke);
    res.status(201).json(joke);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
