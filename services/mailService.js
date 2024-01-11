const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

async function sendEmail(email, subject, message) {
  const mailOptions = {
    from: { name: 'ipodloga', address: process.env.GMAIL_USER },
    to: email,
    subject: subject || 'Hello ✔',
    text: message || 'Hello world?',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent!');
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendEmail };
