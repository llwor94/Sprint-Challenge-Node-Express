const express = require('express');
const router = express.Router();

const db = require('../data/helpers/projectModel');

router.get('/', async (req, res, next) => {
  try {
    let data = await db.get();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    let data = await db.get(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  let body = req.body;
  try {
    let data = await db.insert(body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

const dataCheck = (req, res, next) => {
  let body = req.body;
  if (!(body.name && body.description)) {
    next({ statusCode: 400 });
  }
  if (body.name.length > 128) {
    next({ statusCode: 400 });
  }
};
module.exports = router;
