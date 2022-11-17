const express = require('express');

const user = express();
const pool = require('../server/db');

user.get('/user', async (req, res) => {
  try {
    const allUserInfo = await pool.query('select * from public.user');
    res.send(allUserInfo.rows);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

user.get('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const userInfo = await pool.query(`select * from public.user where email = '${email}'`);
    res.send(userInfo.rows);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

user.post('/user', async (req, res) => {
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

user.delete('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    await pool.query(`delete from public.user where email = '${email}'}`);
    res.send(`User with email ${email} was deleted.`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

user.put('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // data.map((element) => {
    //     if (element)
    //     {

    //     }
    // })

    const { id } = req.body.id;
    const { firstName } = req.body.firstName;
    const { lastName } = req.body.lastName;
    const { facility } = req.body.facility;
    const { newEmail } = req.body.email;
    if (id !== '') {
      await pool.query(`update public.user set id = '${id}' where email = '${email}'`);
    }

    if (firstName !== '') {
      await pool.query(
        `update public.user set firstName = '${firstName}' where email = '${email}'`,
      );
    }

    if (lastName !== '') {
      await pool.query(`update public.user set lastName = '${lastName}' where email = '${email}'`);
    }

    if (facility !== '') {
      await pool.query(`update public.user set facility = '${facility}' where email = '${email}'`);
    }

    if (newEmail !== '') {
      await pool.query(`update public.user set email = '${newEmail}' where email = '${email}'`);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = user;
