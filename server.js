const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const port = process.env.PORT || 8080;

app = express();


app.use(serveStatic(path.join(__dirname, '/dist/')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get(/.*/, function (req, res) {
    res.sendfile(__dirname, '/dist/index.html');
})

app.listen(port);