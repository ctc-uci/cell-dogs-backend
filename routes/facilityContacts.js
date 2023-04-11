const express = require('express');
const { db } = require('../server/db');

const facilityContacts = express();

// GET all facility contacts
facilityContacts.get('/', async (req, res) => {
  try {
    const allContacts = await db.query('SELECT * FROM facility_contacts');
    console.log(allContacts);
    res.status(200).send(allContacts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET facility contact by id
facilityContacts.get('/:facility_id', async (req, res) => {
  try {
    const { facilityId } = req.params;
    const contact = await db.query(
      'SELECT * FROM public.facility_contacts WHERE facility_id = $(facility_id)',
      {
        facilityId,
      },
    );
    res.status(200).send(contact);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Create new facility contact
facilityContacts.post('/', async (req, res) => {
  try {
    const { facilityId, name, title, phoneNumber, emailAddress } = req.body;
    const allContacts = await db.query(
      'INSERT INTO public.facility_contacts (facility_id, name, title, phone_number, email_address) VALUES ($(facilityId), $(name), $(title), $(phoneNumber), $(emailAddress)) RETURNING *',
      {
        facilityId,
        name,
        title,
        phoneNumber,
        emailAddress,
      },
    );
    res.status(200).send(allContacts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE facility contact row
facilityContacts.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, phoneNumber, emailAddress } = req.body;

    const updatedFacilityContact = await db.query(
      `UPDATE public.facility_contacts SET
        ${id ? ` facility_id = $(id) ` : ''}
        ${name ? `, name = $(name) ` : ''}
        ${title ? `, title = $(title) ` : ''}
        ${phoneNumber ? `, phone_number = $(phoneNumber) ` : ''}
        ${emailAddress ? `, email_address = $(emailAddress) ` : ''}
        WHERE facility_id = $(id)
        RETURNING *;`,
      { id, name, title, phoneNumber, emailAddress },
    );
    console.log(`UPDATE public.facility_contacts SET
    ${id ? ` facility_id = $(id) ` : ''}
    ${name ? `, name = $(name) ` : ''}
    ${title ? `, title = $(title) ` : ''}
    ${phoneNumber ? `, phone_number = $(phoneNumber) ` : ''}
    ${emailAddress ? `, email_address = $(emailAddress) ` : ''}
    WHERE facility_id = $(id)
    RETURNING *;`);
    return res.status(200).send(updatedFacilityContact);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// DELETE a facility contact
facilityContacts.delete('/:facility_id', async (req, res) => {
  try {
    const { facilityId } = req.params;
    await db.query('DELETE from public.facility_contacts WHERE facility_id = $(facility_id)', {
      facilityId,
    });
    res.status(200).send('Deleted facility');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = facilityContacts;
