const express = require('express');
const mw = require('../middleware');
const db = require('../data/helpers/actionModel');
const projectDb = require('../data/helpers/projectModel');
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

router.post('/', mw.actions, async (req, res, next) => {
  let body = req.body;
  try {
    let project = await projectDb.get(body.project_id);
    if (!project) {
      return next({ statusCode: 404 });
    }

    let data = await db.insert(body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', mw.actions, async (req, res, next) => {
  let body = req.body;
  try {
    let project = await projectDb.get(body.project_id);
    if (!project) {
      return next({ statusCode: 404 });
    }
    let data = await db.update(req.params.id, body);
    if (!data) {
      return next({ statusCode: 404 });
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', mw.actions, async (req, res, next) => {
  try {
    let data = await db.remove(req.params.id);
    if (data) {
      return res.status(200).json({ id: req.params.id });
    }
    next({ statusCode: 404 });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', mw.actions, async (req, res, next) => {});

module.exports = router;
