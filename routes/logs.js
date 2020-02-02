const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const Log = require('../models/Log');

router.get('/', async (req, res) => {
  try {
    const log = await Log.find(req.body);
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [
    check('message', 'message is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, attention, tech } = req.body;
    try {
      const newLog = new Log({
        message,
        attention,
        tech
      });

      const log = await newLog.save();
      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Errors');
    }
  }
);

router.put('/:id', async (req, res) => {
  const { message, attention, tech } = req.body;

  // Build contact object
  const logFields = {};
  if (message) logFields.message = message;
  if (attention) logFields.attention = attention;
  if (tech) logFields.tech = tech;

  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Contact not found' });

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    );

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Contact not found' });

    await Log.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Log removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', function(req, res, next) {
  var q = req.query.q;
  Log.find(
    {
      tech: {
        $regex: new RegExp(q)
      }
    },
    {
      _id: 0,
      _v: 0
    },
    function(error, data) {
      res.json(data);
    }
  );
});
module.exports = router;
