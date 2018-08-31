const express = require('express');
const mw = require('../middleware');
const db = require('../data/helpers/actionModel');
const router = express.Router();

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
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
