const express = require('express');
const { db } = require('../server/db');

const facilityRouter = express.Router();

// GET all facilities
facilityRouter.get('/', async (req, res) => {
  try {
    const allFacilities = await db.query('SELECT * FROM facility');
    res.status(200).send(allFacilities);
    console.log(allFacilities);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET facility by id
facilityRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const facility = await db.query('SELECT * FROM facility WHERE id = $(id)', { id });
    res.status(200).send(facility);
    console.log(facility);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// CREATE a new facility
facilityRouter.post('/', async (req, res) => {
  try {
    console.log(req);
    const { name, addressLine, city, state, zipcode, description } = req.body;
    const newFacility = await db.query(
      'INSERT INTO facility (name, address_line, city, state, zipcode, description) VALUES ($(name), $(addressLine), $(city), $(state), $(zipcode), $(description)) RETURNING *',
      { name, addressLine, city, state, zipcode, description },
    );
    res.status(200).send(newFacility);
    console.log(newFacility);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// UPDATE facility rows
facilityRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, addressLine, city, state, zipcode, description } = req.body;
    const updatedFacility = await db.query(
      `UPDATE facility
      SET name = $(name), address_line = $(addressLine), city = $(city), state = $(state), zipcode = $(zipcode), description = $(description)
      WHERE id = $(id)
      RETURNING *;`,
      { id, name, addressLine, city, state, zipcode, description },
    );
    res.status(200).send(updatedFacility);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE a facility
facilityRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE from facility WHERE id = $(id)', { id });
    res.status(200).send('Deleted facility');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = facilityRouter;
