const nodemailer = require('nodemailer');
require('dotenv').config();

// email is process.env.NODEMAILER_EMAIL
// password is process.env.NODEMAILER_PASSWORD

const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,

    pass: process.env.NODEMAILER_PASSWORD,
  },
});

module.exports = mailer;
