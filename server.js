const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

function createTinyUrl($strURL) {
    $tinyurl = file_get_contents("http://tinyurl.com/api-create.php?url=" . $strURL);
    return $tinyurl;
}

app.get('/url/*', (req, res) => {
  var url = {
    url: createTinyUrl(req.path.match(/\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}$/)[0]),
  }
  res.json(url);
});

app.get('/*', (req, res) => {
  res.redirect('/url/');
});

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app;