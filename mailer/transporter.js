const nodemailer = require('nodemailer');

// Create transporter with SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'paulgomycode@gmail.com', // Your Gmail email address
    pass: 'jbbttucofczirmjx' // Your Gmail password or App Password
  }
});

module.exports = transporter;
