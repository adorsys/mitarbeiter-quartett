var express = require('express');
var http = require('http');
var app = express();

var router = express.Router();

router.get('/', (req, res) => {
    res.send("hello world");
})

app.use('/', router);

var server = http.createServer(app);
server.listen(8000);