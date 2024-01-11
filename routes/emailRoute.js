const express = require('express');
const { sendEmail } = require('../services/mailService');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, subject, message } = req.query;
    sendEmail(email, subject, message);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
