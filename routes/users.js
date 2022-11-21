const express = require('express');

const user = express.Router(); // This should be an express.Router instance;
const { pool } = require('../server/db');

const { isNumeric } = require('../common/utils');

user.get('/', async (req, res) => {
  try {
    const allUserInfo = await pool.query('select * from public.user');
    return res.status(200).send(allUserInfo.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

user.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const userInfo = await pool.query(`select * from public.user where email = '${email}'`);
    return res.status(200).send(userInfo.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

user.post('/', async (req, res) => {
  try {
    const { id, email, firstName, lastName, facility } = req.body;

    try {
      isNumeric(facility, 'Not a valid facility');
    } catch (err) {
      return res.status(400).send(err.message);
    }

    const newUser = await pool.query(
      `insert into public.user (id, email, first_name, last_name, facility) values ('${id}', '${email}', '${firstName}', '${lastName}', ${facility}) returning *`,
    );
    return res.status(200).send(newUser.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

user.delete('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    await pool.query(`delete from public.user where email = '${email}'`);
    return res.status(200).send(`User with email ${email} was deleted.`);
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

    const updatedUser = await pool.query(
      `UPDATE public.user SET
      ${id ? ` id = '${id}' ` : ''}
      ${email ? `, email = '${newEmail}' ` : ''}
      ${firstName ? `, first_name = '${firstName}' ` : ''}
      ${lastName ? `, last_name = '${lastName}' ` : ''}
      ${facility ? `, facility = ${facility} ` : ''}
      WHERE email = '${email}'
      RETURNING *;`,
    );
    return res.status(200).send(updatedUser.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = user;
