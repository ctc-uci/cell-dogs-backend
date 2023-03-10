const express = require('express');

const user = express(); // This should be an express.Router instance;
const { db } = require('../server/db');

const { isNumeric, keysToCamel } = require('../common/utils');

user.get('/', async (req, res) => {
  try {
    const allUserInfo = await db.query('SELECT * FROM public.user');
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
    const { email, firstName, lastName, facility } = req.body;

    try {
      isNumeric(facility, 'Not a valid facility');
    } catch (err) {
      return res.status(400).send(err.message);
    }

    const newUser = await db.query(
      `INSERT INTO public.user (email, first_name, last_name, facility) VALUES ($(email), $(firstName), $(lastName), $(facility)) RETURNING *`,
      {
        email,
        firstName,
        lastName,
        facility,
      },
    );
    return res.status(200).send(keysToCamel(newUser));
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

user.put('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { id, newEmail, firstName, lastName, facility } = req.body;

    try {
      isNumeric(facility, 'Not a valid facility');
    } catch (err) {
      return res.status(400).send(err.message);
    }

    const updatedUser = await db.query(
      `UPDATE public.user SET
      ${id ? ` id = $(id) ` : ''}
      ${email ? `, email = $(newEmail) ` : ''}
      ${firstName ? `, first_name = $(firstName) ` : ''}
      ${lastName ? `, last_name = $(lastName) ` : ''}
      ${facility ? `, facility = $(facility)` : ''}
      WHERE email = $(email)
      RETURNING *;`,
      { id, newEmail, firstName, lastName, facility, email },
    );
    return res.status(200).send(keysToCamel(updatedUser));
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

user.delete('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    await db.query(`DELETE FROM public.user WHERE email = $(email)`, { email });
    return res.status(200).send(`User with email ${email} was deleted.`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = user;
