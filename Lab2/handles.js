const express = require('express')
const fs = require('fs')
const { promises: fsPromises } = fs
const path = require('path')
const db = require('./db')
const router = express.Router()


router.get('/', (req, res) => {
  res.send(`
    <h1>Bienvenue</h1>
    <p>Links to test:</p>
    <ul>
      <li><a href="http://localhost:3000/AllUsers">http://localhost:3000/AllUsers</a></li>
    </ul>
  `)
})

router.get('/user', (req, res) => {
  res.json(db.users)
});


router.post('/user', (req, res) => {
  const { username, firstname, lastname } = req.body;
  if (!username || !firstname || !lastname) {
    return res.status(400).send('username, firstname and lastname are required');
  }

  const newUser = {
    username,
    firstname,
    lastname,
  };

  db.users.push(newUser);
  return res.status(201).json(newUser);
});

router.get('/articles/:username', (req, res) => {// working
  const user = db.user.find(a => a.username === req.params.username);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('Article not found');
  }
});

module.exports = router
