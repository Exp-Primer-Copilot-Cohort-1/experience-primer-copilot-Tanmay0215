// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');
const comments = require('./comments.json');

app.use(express.static('public'));  
app.use(bodyParser.json());

// get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// add new comment
app.post('/comments', (req, res) => {
  if (req.body.comment) {
    comments.push(req.body);
    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('Error saving comment');
      } else {
        res.send('Comment saved');
      }
    });
  } else {
    res.status(400).send('Comment required');
  }
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});