const express = require('express');
const { db } = require('../server/db');

const dog = express.Router();

dog.get('/', async (request, response) => {
  try {
    const allRows = await db.query('SELECT * FROM dog');
    response.status(200).json(allRows);
  } catch (err) {
    response.status(400).send(err.message);
  }
});

dog.get('/:dogId', async (request, response) => {
  try {
    const { dogId } = request.params;
    const dogIdRows = await db.query(`SELECT * FROM dog WHERE dogId = $(dogId)`, { dogId });
    response.status(200).json(dogIdRows);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

dog.post('/', async (request, response) => {
  try {
    const {
      dogId,
      facilityId,
      groupNum,
      gradDate,
      dogName,
      age,
      shelter,
      breed,
      chipType,
      chipNum,
      gender,
      profilePic,
      altName,
      notes,
      adopterName,
      adopterPhone,
      addrLine,
      adoptCity,
      adoptState,
      zip,
      adoptEmail,
      fees,
      revenue,
    } = request.body;
    await db.query(
      `INSERT INTO dog(dogId, facilityId, groupNum,
        gradDate, dogName, age,
        shelter, breed, chipType,
        chipNum, gender, profilePic,
        altName, notes, adopterName,
        adopterPhone, addrLine, adoptCity,
        adoptState, zip, adoptEmail,
        fees, revenue)
      VALUES('$(dogId)', '$(facilityId)', '$(groupNum)',
      '$(gradDate), '$(dogName)', '$(age)', '$(shelter)',
      '$(breed)', '$(chipType)', '$(chipNum)', '$(gender)',
       '$(profilePic)', '$(altName)', '$(notes)', '$(adopterName)',
        '$(adopterPhone)', '$(addrLine)', '$(adoptCity)', '$(adoptState)',
         '$(zip)', '$(adoptEmail)', '$(fees)', '$(revenue)')`,
      {
        dogId,
        facilityId,
        groupNum,
        gradDate,
        dogName,
        age,
        shelter,
        breed,
        chipType,
        chipNum,
        gender,
        profilePic,
        altName,
        notes,
        adopterName,
        adopterPhone,
        addrLine,
        adoptCity,
        adoptState,
        zip,
        adoptEmail,
        fees,
        revenue,
      },
    );
    response.send('Updated Database.');
  } catch (err) {
    response.status(400).send(err.message);
  }
});

dog.delete('/:dogId', async (request, response) => {
  try {
    const { dogId } = request.params;
    await db.query(`DELETE FROM dog WHERE dogId = '${dogId}'`);
    response.send('Corresponding row was deleted.');
  } catch (err) {
    response.status(400).send(err.message);
  }
});

dog.put('/:dogId', async (req, res) => {
  try {
    const { dogId } = req.params;

    const {
      facilityId,
      groupNum,
      gradDate,
      dogName,
      age,
      shelter,
      breed,
      chipType,
      chipNum,
      gender,
      profilePic,
      altName,
      notes,
      adopterName,
      adopterPhone,
      addrLine,
      adoptCity,
      adoptState,
      zip,
      adoptEmail,
      fees,
      revenue,
    } = req.body;
    const updateDog = await db.query(
      `UPDATE dog SET
      dogId = $(dogId)
      ${facilityId !== undefined ? `, facilityId = $(facilityId)` : ''}
      ${groupNum !== undefined ? `, groupNum = $(groupNum)` : ''}
      ${gradDate !== undefined ? `, gradDate = $(gradDate)` : ''}
      ${dogName !== undefined ? `, dogName = $(dogName)` : ''}
      ${age !== undefined ? `, age = $(age)` : ''}
      ${shelter !== undefined ? `, shelter = $(shelter)` : ''}
      ${breed !== undefined ? `, breed = $(breed)` : ''}
      ${chipType !== undefined ? `, chipType = $(chipType)` : ''}
      ${chipNum !== undefined ? `, chipNum = $(chipNum)` : ''}
      ${gender !== undefined ? `, gender = $(gender)` : ''}
      ${profilePic !== undefined ? `, profilePic = $(profilePic)` : ''}
      ${altName !== undefined ? `, altName = $(altName)` : ''}
      ${notes !== undefined ? `, notes = $(notes)` : ''}
      ${adopterName !== undefined ? `, adopterName = $(adopterName)` : ''}
      ${adopterPhone !== undefined ? `, adopterPhone = $(adopterPhone)` : ''}
      ${addrLine !== undefined ? `, addrLine = $(addrLine)` : ''}
      ${adoptCity !== undefined ? `, adoptCity = $(adoptCity)` : ''}
      ${adoptState !== undefined ? `, adoptState = $(adoptState)` : ''}
      ${zip !== undefined ? `, zip = $(zip)` : ''}
      ${adoptEmail !== undefined ? `, adoptEmail = $(adoptEmail)` : ''}
      ${fees !== undefined ? `, fees = $(fees)` : ''}
      ${revenue !== undefined ? `, revenue = $(revenue)` : ''}
      WHERE
        dogId = $(dogId)
        RETURNING *;`,
      {
        dogId,
        facilityId,
        groupNum,
        gradDate,
        dogName,
        age,
        shelter,
        breed,
        chipType,
        chipNum,
        gender,
        profilePic,
        altName,
        notes,
        adopterName,
        adopterPhone,
        addrLine,
        adoptCity,
        adoptState,
        zip,
        adoptEmail,
        fees,
        revenue,
      },
    );
    return res.status(200).send(updateDog);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = dog;
