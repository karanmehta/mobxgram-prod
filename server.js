const express = require('express');
const path = require('path');
const app = express();
const NODE_ENV = process.env.NODE_ENV || 'production';

app.use(express.static('./dist'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

// app.listen(9000);

app.set('port', process.env.PORT || 9000);

var server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port)
  console.log('ENV : ' + NODE_ENV)
});
