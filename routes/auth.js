const express = require('express');
const User = require('../models/CertificateSchema');
const router = express.Router();
const { body, validationResult } = require('express-validator');
router.post(
  '/create',
  [
    body('serial', 'enter serial no. in numeric').isNumeric(),
    body('date', 'date field cannot be empty').exists(),
  ],
  async (req, res) => {
    // checking for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check if any user with same serial already exist
    try {
      let user = await User.findOne({ serial: req.body.serial });
      if (user) {
        return res.status(400).send('error: "serial no. already exist"');
      }
      console.log(req.body);

      user = await User.create({
        serial: req.body.serial,
        date: req.body.date,
        name: req.body.name,
        course: req.body.course,
        duration: req.body.duration,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
      });
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.send('Server error occured');
    }
  }
);
// get certificate using POST : " localhost:5000/api/auth/certificate "
router.post(
  '/certificate',
  [
    body('serial', 'enter serial no. in numeric').isNumeric(),
    body('date', 'date field cannot be empty').exists(),
  ],
  async (req, res) => {
    // checking for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { serial } = req.body;
    // find if user exists in our database
    try {
      let user = await User.findOne({ serial });
      if (!user) {
        return res.status(400).send('Serial number not found');
      }
      console.log(`${user.name}'s certificate is fetched`);
      const comparePassword = await User.findOne({ date: req.body.date });
      if (!comparePassword) {
        return res.status(400).send('Enter valid information ');
      }
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.send('some error occured');
    }
  }
);

module.exports = router;
