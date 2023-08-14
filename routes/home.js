const express = require("express");
const router = express.Router();
const axios = require('axios');

router.get("/getData", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});



const RECAPTCHA_SECRET_KEY = '6LfDsqYnAAAAAMxr6c0OKKQ3ABvXoAQaHkuQvijM'; // Replace with your reCAPTCHA secret key

router.post('/', async (req, res) => {
  const data = req.body;
  const captchaToken = data.captchaToken;
  try {
    // Verify reCAPTCHA token
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
    );
        console.log('response', response);
    if (response.data.success) {
      console.log('reCAPTCHA verification successful');
      console.log('Received data:', data);
      // Process the data and send a response if needed
      res.json({ message: 'Data received and reCAPTCHA verified successfully' });
    } else {
      console.log('reCAPTCHA verification failed');
      res.status(400).json({ error: 'reCAPTCHA verification failed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;














module.exports = router;
