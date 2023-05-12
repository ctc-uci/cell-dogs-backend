const express = require('express');
const { uuid } = require('uuidv4');

const user = express(); // This should be an express.Router instance;
const { db } = require('../server/db');
const mailer = require('../common/mailer');
const admin = require('../common/firebase');

const { isNumeric, keysToCamel } = require('../common/utils');

user.get('/', async (req, res) => {
  try {
    const allUserInfo = await db.query('SELECT * FROM "user" ORDER BY id::numeric DESC;');
    return res.status(200).send(keysToCamel(allUserInfo));
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

user.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const userInfo = await db.query(`SELECT * FROM public.user WHERE EMAIL = $(email)`, {
      email,
    });
    return res.status(200).send(keysToCamel(userInfo.length > 0 ? userInfo[0] : {}));
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

user.post('/', async (req, res) => {
  try {
    const { email, firstName, lastName, role, accountType } = req.body;
    const registrationId = uuid();
    const userRecord = await admin.auth().createUser({
      email,
      emailVerified: false,
      password: registrationId,
      displayName: `${firstName} ${lastName}`,
      disabled: false,
    });
    const { uid } = userRecord;
    console.log('Successfully created new user:', userRecord.uid);
    const newUser = await db.query(
      `INSERT INTO public.user (email, first_name, last_name, account_type, role, registration_id, uid) VALUES ($(email), $(firstName), $(lastName), $(accountType), $(role), $(registrationId), $(uid)) RETURNING *`,
      {
        email,
        firstName,
        lastName,
        accountType,
        registrationId,
        uid,
        role,
      },
    );
    // add user to firebase

    const resetPasswordLink = await admin.auth().generatePasswordResetLink(email);
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Registration Link',
      text: `Hi ${firstName}, Please click on the following link to register: ${resetPasswordLink}`,
    };

    mailer.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        throw new Error('Error sending email');
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    return res.status(200).send(keysToCamel(newUser));
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

user.put('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { newEmail, firstName, lastName, accountType, role } = req.body;

    const updatedUser = await db.query(
      `UPDATE public.user SET
        email = $(newEmail),
        first_name = $(firstName),
        last_name = $(lastName),
        account_type = $(accountType),
        role = $(role)
      WHERE email = $(email)
      RETURNING *;`,
      { newEmail, firstName, lastName, accountType, email, role },
    );
    return res.status(200).send(keysToCamel(updatedUser));
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

user.delete('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    // get uid from email using firebase
    const userRecord = await admin.auth().getUserByEmail(email);
    await db.query(`DELETE FROM public.user WHERE email = $(email)`, { email });
    await admin.auth().deleteUser(userRecord.uid);
    return res.status(200).send(`User with email ${email} was deleted.`);
    // dele
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = user;
