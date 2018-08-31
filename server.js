const express = require('express');
var morgan = require('morgan');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.send('Sup fam');
});

server.listen(7000, () => console.log('ya made it mon'));
