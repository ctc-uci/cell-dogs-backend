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

dog.get('/search/:name', async (request, response) => {
  try {
    const { name } = request.params;
    const stringMatchRows = await db.query(
      `SELECT * FROM dog WHERE dogname LIKE '%' || $(name) || '%' OR shelter LIKE '%' || $(name) || '%' OR breed LIKE '%' || $(name) || '%' OR 
      altname LIKE '%' || $(name) || '%' OR notes LIKE '%' || $(name) || '%' OR adoptername LIKE '%' || $(name) || '%' OR adopterphone LIKE '%' || $(name) || '%'
      OR addrline LIKE '%' || $(name) || '%' OR adoptcity LIKE '%' || $(name) || '%' OR adoptstate LIKE '%' || $(name) || '%' OR zip LIKE '%' || $(name) || 
      '%' OR adoptemail LIKE '%' || $(name) || '%'
`,
      { name },
    );
    response.status(200).json(stringMatchRows);
  } catch (err) {
    response.status(400).send(err.message);
  }
});

dog.post('/', async (request, response) => {
  try {
    const {
      dogid,
      facilityid,
      groupnum,
      graddate,
      dogname,
      age,
      shelter,
      breed,
      chiptype,
      chipnum,
      gender,
      altname,
      notes,
      adoptername,
      adopterphone,
      addrline,
      adoptcity,
      adoptstate,
      zip,
      adoptemail,
      fees,
      revenue,
      service,
      therapy,
      staffAdoption,
      specialNeeds,
      deceased,
    } = request.body;
    const newDog = await db.query(
      `INSERT INTO dog(dogid, facilityid, groupnum,
        graddate, dogname, age,
        shelter, breed, chiptype,
        chipnum, gender,
        altname, notes, adoptername,
        adopterphone, addrline, adoptcity,
        adoptstate, zip, adoptemail,
        fees, revenue, service, therapy,
        "staffAdoption", "specialNeeds", deceased)
      VALUES($(dogid), $(facilityid), $(groupnum),
      $(graddate), $(dogname), $(age), $(shelter),
      $(breed), $(chiptype), $(chipnum), $(gender),
        $(altname), $(notes), $(adoptername),
        $(adopterphone), $(addrline), $(adoptcity), $(adoptstate),
         $(zip), $(adoptemail), $(fees), $(revenue), $(service),
         $(therapy), $(staffAdoption), $(specialNeeds), $(deceased)) RETURNING *`,
      {
        dogid,
        facilityid,
        groupnum,
        graddate,
        dogname,
        age,
        shelter,
        breed,
        chiptype,
        chipnum,
        gender,
        altname,
        notes,
        adoptername,
        adopterphone,
        addrline,
        adoptcity,
        adoptstate,
        zip,
        adoptemail,
        fees,
        revenue,
        service,
        therapy,
        staffAdoption,
        specialNeeds,
        deceased,
      },
    );
    response.send(newDog);
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
      facilityid,
      groupnum,
      graddate,
      dogname,
      age,
      shelter,
      breed,
      chiptype,
      chipnum,
      gender,
      altname,
      notes,
      adoptername,
      adopterphone,
      addrline,
      adoptcity,
      adoptstate,
      zip,
      adoptemail,
      fees,
      revenue,
      service,
      therapy,
      staffAdoption,
      specialNeeds,
      deceased,
    } = req.body;

    const updatedDog = await db.query(
      `UPDATE dog SET
      facilityid = $(facilityid),
      groupnum = $(groupnum),
      graddate = $(graddate),
      dogname = $(dogname),
      age = $(age),
      shelter = $(shelter),
      breed = $(breed),
      chiptype = $(chiptype),
      chipnum = $(chipnum),
      gender = $(gender),
      altname = $(altname),
      notes = $(notes),
      adoptername = $(adoptername),
      adopterphone = $(adopterphone),
      addrline = $(addrline),
      adoptcity = $(adoptcity),
      adoptstate = $(adoptstate),
      zip = $(zip),
      adoptemail = $(adoptemail),
      fees = $(fees),
      revenue = $(revenue),
      service = $(service),
      therapy = $(therapy),
      "staffAdoption" = $(staffAdoption),
      "specialNeeds" = $(specialNeeds),
      deceased = $(deceased)
      WHERE dogid = $(dogId)
      RETURNING *`,
      {
        facilityid,
        groupnum,
        graddate,
        dogname,
        age,
        shelter,
        breed,
        chiptype,
        chipnum,
        gender,
        altname,
        notes,
        adoptername,
        adopterphone,
        addrline,
        adoptcity,
        adoptstate,
        zip,
        adoptemail,
        fees,
        revenue,
        service,
        therapy,
        staffAdoption,
        specialNeeds,
        deceased,
        dogId,
      },
    );

    res.send(updatedDog.rows[0]);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = dog;
