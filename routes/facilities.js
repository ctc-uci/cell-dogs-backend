const express = require('express');
const { isZipCode } = require('../common/utils');
const { db } = require('../server/db');

const facilityRouter = express();

// GET all facilities
facilityRouter.get('/', async (req, res) => {
  try {
    const allFacilities = await db.query('SELECT * FROM facility');
    res.status(200).send(allFacilities);
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
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// CREATE a new facility
facilityRouter.post('/', async (req, res) => {
  try {
    const { name, addressLine, city, state, zipcode, description } = req.body;
    isZipCode(zipcode, 'Not a valid zipcode');
    const newFacility = await db.query(
      'INSERT INTO facility (name, address_line, city, state, zipcode, description) VALUES ($(name), $(addressLine), $(city), $(state), $(zipcode), $(description)) RETURNING *',
      { name, addressLine, city, state, zipcode, description },
    );
    res.status(200).send(newFacility);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE facility row
facilityRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, addressLine, city, state, zipcode, description } = req.body;
    if (zipcode) {
      isZipCode(zipcode, 'Not a valid zipcode');
    }
    const updatedFacility = await db.query(
      `UPDATE facility SET
      id = $(id)
      ${name ? `, name = $(name) ` : ''}
      ${addressLine ? `, address_line = $(addressLine) ` : ''}
      ${city ? `, city = $(city) ` : ''}
      ${state ? `, state = $(state) ` : ''}
      ${zipcode ? `, zipcode = $(zipcode) ` : ''}
      ${description ? `, description = $(description) ` : ''}
      WHERE id = $(id)
      RETURNING *;`,
      { id, name, addressLine, city, state, zipcode, description },
    );
    res.status(200).send(updatedFacility);
  } catch (err) {
    res.status(500).send(err.message);
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
