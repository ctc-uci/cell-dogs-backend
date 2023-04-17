const Cryptr = require('cryptr');
const admin = require('firebase-admin');
const { omegaPrivateStuff } = require('../omega-private.json');

require('dotenv').config();

const cryptr = new Cryptr(process.env.OMEGA_SECRET_KEY);

const serviceAccount = JSON.parse(cryptr.decrypt(omegaPrivateStuff));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
