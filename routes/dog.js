const express = require('express');
const Prisma = require('@prisma/client');
const { db } = require('../server/db');

const dog = express.Router();

const prisma = new Prisma.PrismaClient();
dog.get('/', async (request, response) => {
  try {
    const { filterBy, facility } = request.query;
    console.log(filterBy, facility);
    const conditionMap = {
      allMales: `("gender" = 'Male' OR "gender" = 'Male-Neutered')`,
      allFemales: `("gender" = 'Female' OR "gender" = 'Female-Spayed')`,
      service: `"service" = true`,
      specialNeeds: `"specialNeeds" = true`,
      therapy: `"therapy" = true`,
      deceased: `"deceased" = true`,
      staffAdoption: `"staffAdoption" = true`,
      All: '',
    };
    const facilityCondition = facility ? `AND facilityid = $(facility)` : '';
    const allRows = await db.query(
      `SELECT * FROM dog WHERE ${
        conditionMap[filterBy] || '1=1'
      } ${facilityCondition} ORDER BY graddate DESC`,
      {
        facility,
      },
    );
    response.status(200).json(allRows);
  } catch (err) {
    console.log(err);
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
    const { filterBy, facility } = request.query;

    console.log(filterBy, facility);
    const conditionMap = {
      allMales: `"gender" = 'Male'`,
      allFemales: `"gender" = 'Female`,
      service: `"service" = true`,
      specialNeeds: `"specialNeeds" = true`,
      staffAdoption: `"staffAdoption" = true`,
      All: '',
    };
    const facilityCondition = facility ? `AND facilityid = $(facility)` : '';
    const stringMatchRows = await db.query(
      `SELECT * FROM dog WHERE (dogname ILIKE '%' || $(name) || '%' OR shelter ILIKE '%' || $(name) || '%' OR breed ILIKE '%' || $(name) || '%' OR 
      altname ILIKE '%' || $(name) || '%' OR notes ILIKE '%' || $(name) || '%' OR adoptername ILIKE '%' || $(name) || '%' OR adopterphone ILIKE '%' || $(name) || '%'
      OR addrline ILIKE '%' || $(name) || '%' OR adoptcity ILIKE '%' || $(name) || '%' OR adoptstate ILIKE '%' || $(name) || '%' OR zip ILIKE '%' || $(name) || 
      '%' OR adoptemail ILIKE '%' || $(name) || '%') AND ${
        conditionMap[filterBy] || '1=1'
      } ${facilityCondition} ORDER BY graddate DESC`,
      {
        name,
        facility,
      },
    );
    response.status(200).json(stringMatchRows);
  } catch (err) {
    console.log(err);
    response.status(400).send(err.message);
  }
});

dog.post('/', async (request, response) => {
  try {
    const {
      revenue,
      fees,
      adopterzip,
      adopterstate,
      adoptercity,
      adopteraddrline,
      adopteremail,
      adopterphone,
      adoptername,
      notes,
      facilityUnit,
      facilityid,
      graddate,
      groupnum,
      shelter,
      altname,
      gender,
      chipnum,
      chiptype,
      image,
      breed,
      age,
      dogname,
      specialTag,
      therapyTag,
      staffAdoptionTag,
      deceasedTag,
      serviceTag,
    } = request.body;
    const genderMap = {
      Female: Prisma.vax.Female,
      Male: Prisma.vax.Male,
      'Female-Spayed': Prisma.vax.Female_Spayed,
      'Male-Neutered': Prisma.vax.Male_Neutered,
    };

    const newDog = await prisma.dog.create({
      data: {
        revenue,
        fees,
        zip: adopterzip,
        adoptstate: adopterstate,
        adoptcity: adoptercity,
        addrline: adopteraddrline,
        adoptemail: adopteremail,
        adopterphone,
        adoptername,
        image,
        notes,
        facilityUnit,
        graddate: new Date(graddate),
        groupnum: String(groupnum),
        shelter,
        altname,
        gender: genderMap[gender],
        chipnum: parseInt(chipnum, 10),
        chiptype,
        breed,
        age,
        dogname,
        specialNeeds: specialTag,
        therapy: therapyTag,
        staffAdoption: staffAdoptionTag,
        deceased: deceasedTag,
        service: serviceTag,
        facility: {
          connect: {
            id: parseInt(facilityid, 10),
          },
        },
      },
    });
    response.send(newDog);
  } catch (err) {
    console.log(err);
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
      revenue,
      fees,
      adopterzip,
      adopterstate,
      adoptercity,
      adopteraddrline,
      adopteremail,
      adopterphone,
      adoptername,
      notes,
      facilityUnit,
      // facilityid,
      graddate,
      groupnum,
      shelter,
      altname,
      gender,
      chipnum,
      chiptype,
      image,
      breed,
      age,
      dogname,
      specialTag,
      therapyTag,
      staffAdoptionTag,
      deceasedTag,
      serviceTag,
    } = req.body;
    const genderMap = {
      Female: Prisma.vax.Female,
      Male: Prisma.vax.Male,
      'Female-Spayed': Prisma.vax.Female_Spayed,
      'Male-Neutered': Prisma.vax.Male_Neutered,
    };
    const data = {
      revenue,
      fees,
      zip: adopterzip,
      adoptstate: adopterstate,
      adoptcity: adoptercity,
      addrline: adopteraddrline,
      adoptemail: adopteremail,
      adopterphone,
      adoptername,
      image,
      notes,
      facilityUnit,
      graddate: new Date(graddate),
      groupnum: String(groupnum),
      shelter,
      altname,
      gender: genderMap[gender],
      chipnum: parseInt(chipnum, 10),
      chiptype,
      breed,
      age,
      dogname,
      specialNeeds: specialTag,
      therapy: therapyTag,
      staffAdoption: staffAdoptionTag,
      deceased: deceasedTag,
      service: serviceTag,
      // facility: {
      //   connect: {
      //     id: parseInt(facilityid, 10),
      //   },
      // },
    };
    Object.keys(data).forEach((key) => [undefined, NaN].includes(data[key]) && delete data[key]);

    const newDog = await prisma.dog.update({
      data,
      where: {
        dogid: parseInt(dogId, 10),
      },
    });
    res.send(newDog);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

module.exports = dog;
