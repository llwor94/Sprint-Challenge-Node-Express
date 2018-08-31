const express = require('express');
var morgan = require('morgan');

const actionRouters = require('./routes/actionsRoutes');
const projectRouters = require('./routes/projectsRoutes');

const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

server.use('/actions', actionRouters);
server.use('/projects', projectRouters);

server.use(errorHandler);

server.get('/', (req, res) => {
  res.send('Sup fam');
});

function errorHandler(err, req, res, next) {
  console.log(err);

  switch (err.statusCode) {
    case 404:
      res.status(404).json({
        message: 'The requested file does not exist.',
      });
      break;
    case 400:
      res.status(400).json({
        message: 'There was an error regarding your input',
      });
    default:
      res.status(500).json({
        message: 'There was an error performing the required operation',
      });
      break;
  }
}

server.listen(7000, () => console.log('ya made it mon'));
