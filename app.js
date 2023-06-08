const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();
const session = require('express-session');
const axios = require('axios');
app.use(session({
  secret: process.env.GITHUB_CLIENT_SECRET,
  resave: false,
  saveUninitialized: true
}))

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'))
  process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  });
app.get('/login', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})
app.get('/callback', (req, res) => {
  const {code} = req.query;
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code
  }
  const opts = {
    headers: {accept: 'application/json'}
  }
  axios.post('https://github.com/login/oauth/access_token', body, opts)
  .then((res2) => {
    req.session.token = res2.data.access_token;
    res.redirect('/api-docs')
  })
  .catch(err => res.status(500).json({ message: err.message }))
})
app.get('/logout', (req, res) => {
  req.session.token = null;
  res.redirect('/api-docs')
})

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});