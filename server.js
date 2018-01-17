const express = require('express');
const app = express();

app.get('/somedata', (req, res) => {
  res.send('here is the info');
});

app.listen(3000, () => {
  console.log("Present");
});
