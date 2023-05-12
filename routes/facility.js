const express = require('express');
const { db } = require('../server/db');

const facilityRouter = express();

// GET all facilities
facilityRouter.get('/', async (req, res) => {
  try {
    const allFacilities = await db.query(`
      SELECT f.*, 
        (SELECT STRING_AGG(name, ', ')
        FROM facility_contacts
        WHERE facility_id = f.id) AS facility_contacts
      FROM facility f;
    `);
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
    const { name, addressLine, description, image } = req.body;

    if (!name) throw new Error('Name is required.');
    if (!addressLine) throw new Error('Address line is required.');
    if (!description) throw new Error('Description is required.');

    const newFacility = await db.query(
      'INSERT INTO facility (name, address_line, description, image) VALUES ($(name), $(addressLine), $(description), $(image)) RETURNING *',
      { name, addressLine, description, image },
    );
    return res.status(200).send(newFacility);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// UPDATE facility row
facilityRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, addressLine, description } = req.body;

    if (!name) throw new Error('Name is required.');
    if (!addressLine) throw new Error('Address line is required.');
    if (!description) throw new Error('Description is required.');

    const updatedFacility = await db.query(
      `UPDATE facility SET
      id = $(id)
      ${name ? `, name = $(name) ` : ''}
      ${addressLine ? `, address_line = $(addressLine) ` : ''}
      ${description ? `, description = $(description) ` : ''}
      WHERE id = $(id)
      RETURNING *;`,
      { id, name, addressLine, description },
    );
    return res.status(200).send(updatedFacility);
  } catch (err) {
    return res.status(500).send(err.message);
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
