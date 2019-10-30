const cors = require('cors');

const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const port = process.env.PORT || 8080;

app = express();
app.use(cors());

app.use(serveStatic(path.join(__dirname, '/dist/')));


app.get(/.*/, function (req, res) {
    res.sendfile(__dirname, '/dist/index.html');
})

app.listen(port);