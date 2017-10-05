const express = require('express');
const http = require('http');

const app = express();

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/', router);

const server = http.createServer(app);
server.listen(8000);
