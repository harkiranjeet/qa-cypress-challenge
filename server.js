const express = require('express');
const helpers = require('./helpers');

// Add a max number to prevent out of memory error
const MAX_N = 10000000;

const app = express();

app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/index.html'));
});

app.get('/api/:n', (req, res) => {
  var n = req.params.n;
  
  if (n > MAX_N) {
    console.log('Number exceeds limit');
    res.json({
      error: {
        message: 'Number exceeds limit'
      }
    })
  } else {
    console.log('Getting median for', n)
    res.json({
      median: helpers.getMedian(n)
    });
  }
});

app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = app; // For testing