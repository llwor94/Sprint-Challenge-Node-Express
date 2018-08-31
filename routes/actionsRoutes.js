const express = require('express');
const router = express.Router();

const db = require('../data/helpers/actionModel');

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
    if (data) {
      return res.status(200).json(data);
    } else {
      next({ statusCode: 404 });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
