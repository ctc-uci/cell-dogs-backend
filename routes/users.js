const express = require('express');

const user = express.Router(); // This should be an express.Router instance;
const { pool } = require('../server/db');

user.get('/', async (req, res) => {
  try {
    const allUserInfo = await pool.query('select * from public.user');
    res.send(allUserInfo.rows);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

user.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const userInfo = await pool.query(`select * from public.user where email = '${email}'`);
    res.send(userInfo.rows);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

user.post('/', async (req, res) => {
  try {
    const { id, email, firstName, lastName, facility } = req.body;
    const newUser = await pool.query(
      `insert into public.user (id, email, first_name, last_name, facility) values ('${id}', '${email}', '${firstName}', '${lastName}', '${facility}') returning *`,
    );
    res.send(newUser.rows);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

user.delete('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    await pool.query(`delete from public.user where email = '${email}'}`);
    res.send(`User with email ${email} was deleted.`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

user.put('/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const { id, firstName, lastName, facility, newEmail } = req.body;

    if (id !== null) {
      await pool.query(`update public.user set id = '${id}' where email = '${email}'`);
    }

    if (firstName !== null) {
      await pool.query(
        `update public.user set firstName = '${firstName}' where email = '${email}'`,
      );
    }

    if (lastName !== null) {
      await pool.query(`update public.user set lastName = '${lastName}' where email = '${email}'`);
    }

    if (facility !== null) {
      await pool.query(`update public.user set facility = '${facility}' where email = '${email}'`);
    }

    if (newEmail !== null) {
      await pool.query(`update public.user set email = '${newEmail}' where email = '${email}'`);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = user;
