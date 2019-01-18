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

//

const jsonServer = require('json-server');
const jserver = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
//const port = process.env.PORT || 7777;
const port = 7777;

jserver.use(middlewares);
jserver.use(router);

jserver.listen(port);
