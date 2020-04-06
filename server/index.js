const express = require('express');
const bodyParser = require('body-parser');
const { _connect, log, getAllStatsDoc } = require("./common")
_connect()

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/allDocuments', async (req, res) => {
  const name = req.query.name || 'World';
  const countries = await getAllStatsDoc()
  res.setHeader('Content-Type', 'application/json');
  res.send({countries});
});

app.get('/api/countryData', async (req, res) => {
  const name = req.query.iso2 || 'US';
  const countries = await getAllStatsDoc()
  res.setHeader('Content-Type', 'application/json');
  res.send({countries});
});

app.get('/', (req, res) => {
    // const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `can you see me??`}));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);