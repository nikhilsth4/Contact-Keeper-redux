const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const Tech = require('../models/Tech');

router.get('/', async (req, res) => {
  try {
    const tech = await Tech.find(req.body);
    res.json(tech);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [
    check('firstName', 'first name is required')
      .not()
      .isEmpty(),
    check('secondName', 'Last name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, secondName } = req.body;
    try {
      const newTech = new Tech({
        firstName,
        secondName
      });

      const tech = await newTech.save();
      res.json(tech);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Errors');
    }
  }
);

router.put('/:id', async (req, res) => {
  const { firstName, secondName } = req.body;

  // Build contact object
  const techFields = {};
  if (firstName) techFields.firstName = firstName;
  if (secondName) techFields.secondName = secondName;

  try {
    let tech = await Tech.findById(req.params.id);

    if (!tech) return res.status(404).json({ msg: 'Contact not found' });

    tech = await Tech.findByIdAndUpdate(
      req.params.id,
      { $set: techFields },
      { new: true }
    );

    res.json(tech);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let tech = await Tech.findById(req.params.id);

    if (!tech) return res.status(404).json({ msg: 'Tech not found' });

    await Tech.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Tech removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
