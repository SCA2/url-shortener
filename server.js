const express = require('express');
const tinyurl = require('tinyurl');

const app = express();
const port = process.env.PORT || 8080;

app.get('/little-url/new/*', (req, res) => {
  var long_url = req.url.match(/(\/new\/)(http(|s):\/\/www.\w+.\w+)/i);
  if(long_url) {
    long_url = long_url[2];

    tinyurl.shorten(long_url, (short_url) => {
      const little = 'https://little-url.herokuapp.com/';

      short_url = short_url.match(/(http:\/\/tinyurl.com\/)(.*)/)[2];
      short_url = little + short_url;
      console.log(short_url);

      res.json({ original_url: long_url, short_url: short_url });
    });
  } else {
    res.json({ original_url: 'bad url' });
  }
});

app.get('/little-url/*', (req, res) => {
  const tiny = 'http://tinyurl.com/';
  var little_url = req.url.match(/\w+$/i)[0];
  var tiny_url = tiny + little_url;

  console.log(tiny_url);

  res.redirect(tiny_url);
});

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app;