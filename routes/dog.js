/* eslint-disable camelcase */
const express = require('express');
const { pool } = require('../server/db');

const dog = express();

dog.get('/', async (request, response) => {
  try {
    const allRows = await pool.query('select * from dog');
    response.send(allRows.rows);
  } catch (err) {
    response.status(400).send(err.message);
  }
});

dog.get('/:dog_id', async (request, response) => {
  try {
    const { dog_id } = request.params;
    const dogIdRows = await pool.query(`select * from dog where dog_id = '${dog_id}'`);
    response.send(dogIdRows.rows);
  } catch (err) {
    response.status(400).send(err.message);
  }
});

dog.post('/', async (request, response) => {
  try {
    const {
      dog_id,
      facility_id,
      group_num,
      grad_date,
      dog_name,
      age,
      shelter,
      breed,
      chip_type,
      chip_num,
      gender,
      profile_pic,
      alt_name,
      notes,
      adopter_name,
      adopter_phone,
      addr_line,
      adopt_city,
      adopt_state,
      zip,
      adopt_email,
      fees,
      revenue,
    } = request.body;
    await pool.query(
      `insert into dog(dog_id, facility_id, group_num, grad_date, dog_name, age, shelter, breed, chip_type, chip_num, gender, profile_pic, alt_name, notes, adopter_name, adopter_phone, addr_line, adopt_city, adopt_state, zip, adopt_email, fees, revenue) VALUES('${dog_id}', '${facility_id}', '${group_num}', '${grad_date}, '${dog_name}', '${age}', '${shelter}', '${breed}', '${chip_type}', '${chip_num}', '${gender}', '${profile_pic}', '${alt_name}', '${notes}', '${adopter_name}', '${adopter_phone}', '${addr_line}', '${adopt_city}', '${adopt_state}', '${zip}', '${adopt_email}', '${fees}', '${revenue}')`,
    );
    response.send('Updated Database.');
  } catch (err) {
    response.status(400).send(err.message);
  }
});

dog.delete('/:dog_id', async (request, response) => {
  try {
    const { dog_id } = request.params;
    await pool.query(`delete *from dog where dog_id = '${dog_id}'`);
    response.send('Corresponding row was deleted.');
  } catch (err) {
    response.status(400).send(err.message);
  }
});

dog.put('/:dog_id', async (req, res) => {
  try {
    const { dog_id } = req.params;

    const { facility_id } = req.body.facility_id;
    const { group_num } = req.body.group_num;
    const { grad_date } = req.body.grad_date;
    const { dog_name } = req.body.dog_name;
    const { age } = req.body.age;
    const { shelter } = req.body.shelter;
    const { breed } = req.body.breed;
    const { chip_type } = req.body.chip_type;
    const { chip_num } = req.body.chip_num;
    const { gender } = req.body.gender;
    const { profile_pic } = req.body.profile_pic;
    const { alt_name } = req.body.alt_name;
    const { notes } = req.body.notes;
    const { adopter_name } = req.body.adopter_name;
    const { adopter_phone } = req.body.adopter_phone;
    const { addr_line } = req.body.addr_line;
    const { adopt_city } = req.body.adopt_city;
    const { adopt_state } = req.body.adopt_state;
    const { zip } = req.body.zip;
    const { adopt_email } = req.body.adopt_email;
    const { fees } = req.body.fees;
    const { revenue } = req.body.revenue;
    if (facility_id !== '') {
      await pool.query(`UPDATE dog SET facility_id = '${facility_id}' WHERE dog_id = '${dog_id}'`);
    }

    if (group_num !== '') {
      await pool.query(`UPDATE dog SET group_num = '${group_num}' WHERE dog_id = '${dog_id}'`);
    }

    if (grad_date !== '') {
      await pool.query(`UPDATE dog SET grad_date = '${grad_date}' WHERE dog_id = '${dog_id}'`);
    }

    if (dog_name !== '') {
      await pool.query(`UPDATE dog SET dog_name = '${dog_name}' WHERE dog_id = '${dog_id}'`);
    }

    if (age !== '') {
      await pool.query(`UPDATE dog SET age = '${age}' WHERE dog_id = '${dog_id}'`);
    }

    if (shelter !== '') {
      await pool.query(`UPDATE dog SET shelter = '${shelter}' WHERE dog_id = '${dog_id}'`);
    }

    if (breed !== '') {
      await pool.query(`UPDATE dog SET breed = '${breed}' WHERE dog_id = '${dog_id}'`);
    }

    if (chip_type !== '') {
      await pool.query(`UPDATE dog SET chip_type = '${chip_type}' WHERE dog_id = '${dog_id}'`);
    }

    if (chip_num !== '') {
      await pool.query(`UPDATE dog SET chip_num = '${chip_num}' WHERE dog_id = '${dog_id}'`);
    }

    if (gender !== '') {
      await pool.query(`UPDATE dog SET gender = '${gender}' WHERE dog_id = '${dog_id}'`);
    }

    if (profile_pic !== '') {
      await pool.query(`UPDATE dog SET profile_pic = '${profile_pic}' WHERE dog_id = '${dog_id}'`);
    }

    if (alt_name !== '') {
      await pool.query(`UPDATE dog SET alt_name = '${alt_name}' WHERE dog_id = '${dog_id}'`);
    }

    if (notes !== '') {
      await pool.query(`UPDATE dog SET notes = '${notes}' WHERE dog_id = '${dog_id}'`);
    }

    if (adopter_name !== '') {
      await pool.query(
        `UPDATE dog SET adopter_name = '${adopter_name}' WHERE dog_id = '${dog_id}'`,
      );
    }

    if (adopter_phone !== '') {
      await pool.query(
        `UPDATE dog SET adopter_phone = '${adopter_phone}' WHERE dog_id = '${dog_id}'`,
      );
    }

    if (addr_line !== '') {
      await pool.query(`UPDATE dog SET addr_line = '${addr_line}' WHERE dog_id = '${dog_id}'`);
    }

    if (adopt_city !== '') {
      await pool.query(`UPDATE dog SET adopt_city = '${adopt_city}' WHERE dog_id = '${dog_id}'`);
    }

    if (adopt_state !== '') {
      await pool.query(`UPDATE dog SET adopt_state = '${adopt_state}' WHERE dog_id = '${dog_id}'`);
    }

    if (zip !== '') {
      await pool.query(`UPDATE dog SET zip = '${zip}' WHERE dog_id = '${dog_id}'`);
    }

    if (adopt_email !== '') {
      await pool.query(`UPDATE dog SET adopt_email = '${adopt_email}' WHERE dog_id = '${dog_id}'`);
    }

    if (fees !== '') {
      await pool.query(`UPDATE dog SET fees = '${fees}' WHERE dog_id = '${dog_id}'`);
    }

    if (revenue !== '') {
      await pool.query(`UPDATE dog SET revenue = '${revenue}' WHERE dog_id = '${dog_id}'`);
    }
    console.log(dog);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = dog;
