const nodemailer = require('nodemailer');
require('dotenv').config();

// email is process.env.NODEMAILER_EMAIL
// password is process.env.NODEMAILER_PASSWORD

const mailer = nodemailer.createTransport({
  host: 'smtp.ionos.com',
  auth: {
    user: process.env.NODEMAILER_EMAIL,

    pass: process.env.NODEMAILER_PASSWORD,
  },
  from: process.env.REACT_APP_EMAIL_USERNAME,
  secure: true,
});

module.exports = mailer;
