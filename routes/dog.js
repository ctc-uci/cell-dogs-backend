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
      OR addrline LIKE '%' || $(name) || '%' OR adoptcity LIKE '%' || $(name) || '%' OR adoptstate LIKE '%' || $(name) || '%' OR zip LIKE '%' || $(name) || '%' OR adoptemail LIKE '%' || $(name) || '%'
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
      profilepic,
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
    } = request.body;
    const newDog = await db.query(
      `INSERT INTO dog(dogid, facilityid, groupnum,
        graddate, dogname, age,
        shelter, breed, chiptype,
        chipnum, gender, profilepic,
        altname, notes, adoptername,
        adopterphone, addrline, adoptcity,
        adoptstate, zip, adoptemail,
        fees, revenue)
      VALUES($(dogid), $(facilityid), $(groupnum),
      $(graddate), $(dogname), $(age), $(shelter),
      $(breed), $(chiptype), $(chipnum), $(gender),
       $(profilepic), $(altname), $(notes), $(adoptername),
        $(adopterphone), $(addrline), $(adoptcity), $(adoptstate),
         $(zip), $(adoptemail), $(fees), $(revenue)) RETURNING *`,
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
        profilepic,
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
      profilepic,
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
    } = req.body;
    const updateDog = await db.query(
      `UPDATE dog SET
      ${facilityid !== undefined ? ` facilityid = $(facilityid)` : ''}
      ${groupnum !== undefined ? `, groupnum = $(groupnum)` : ''}
      ${graddate !== undefined ? `, graddate = $(graddate)` : ''}
      ${dogname !== undefined ? `, dogName = $(dogname)` : ''}
      ${age !== undefined ? `, age = $(age)` : ''}
      ${shelter !== undefined ? `, shelter = $(shelter)` : ''}
      ${breed !== undefined ? `, breed = $(breed)` : ''}
      ${chiptype !== undefined ? `, chiptype = $(chiptype)` : ''}
      ${chipnum !== undefined ? `, chipnum = $(chipnum)` : ''}
      ${gender !== undefined ? `, gender = $(gender)` : ''}
      ${profilepic !== undefined ? `, profilepic = $(profilepic)` : ''}
      ${altname !== undefined ? `, altname = $(altname)` : ''}
      ${notes !== undefined ? `, notes = $(notes)` : ''}
      ${adoptername !== undefined ? `, adoptername = $(adoptername)` : ''}
      ${adopterphone !== undefined ? `, adopterphone = $(adopterphone)` : ''}
      ${addrline !== undefined ? `, addrline = $(addrline)` : ''}
      ${adoptcity !== undefined ? `, adoptcity = $(adoptcity)` : ''}
      ${adoptstate !== undefined ? `, adoptstate = $(adoptstate)` : ''}
      ${zip !== undefined ? `, zip = $(zip)` : ''}
      ${adoptemail !== undefined ? `, adoptemail = $(adoptemail)` : ''}
      ${fees !== undefined ? `, fees = $(fees)` : ''}
      ${revenue !== undefined ? `, revenue = $(revenue)` : ''}
      WHERE
        dogid = $(dogId)
        RETURNING *;`,
      {
        dogId,
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
        profilepic,
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
      },
    );
    return res.status(200).send(updateDog);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = dog;
