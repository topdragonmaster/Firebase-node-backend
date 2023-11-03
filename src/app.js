const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
var cors = require('cors');
const app = express();

app.use(cors());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', routes);

app.use('*', (req, res)=>{
  res.send('Invalid route')
})

app.listen(5000, () => {
  console.log('App listening on port 5000');
});

module.exports = app;
