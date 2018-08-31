const express = require('express');
var morgan = require('morgan');

const actionRouters = require('./routes/actionsRoutes');
const projectRouters = require('./routes/projectsRoutes');

const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

server.use('./actions', actionRouters);
server.use('./projects', projectRouters);

server.get('/', (req, res) => {
  res.send('Sup fam');
});

server.listen(7000, () => console.log('ya made it mon'));
