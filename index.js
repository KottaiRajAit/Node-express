const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3005;
const logger = require("morgan")
const path = require("path");


app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"))

//app.use(express.static(path.join(__dirname, "../client/build")))
const RECAPTCHA_SECRET_KEY = '6LfDsqYnAAAAAMxr6c0OKKQ3ABvXoAQaHkuQvijM'; // Replace with your reCAPTCHA secret key

app.post('/api/postData', async (req, res) => {
  const data = req.body;
  const captchaToken = data.captchaToken;
  console.log('Received data:', data);
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

// app.get("*", function (_, res) {
//     res.sendFile(
//       path.join(__dirname, "../client/build/index.html"),
//       function (err) {
//         if (err) {
//           res.status(500).send(err);
//         }
//       }
//     );
// });

app.get('/api/get',async(req,res)=>{

    console.log("test")
  
  
  })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;