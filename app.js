const express = require('express');
const cors = require('cors');
const dog = require('./routes/dog');
require('dotenv').config();

const facilityRouter = require('./routes/facility');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
  }),
);

app.use(express.json());
app.use('/dog', dog);
app.use('/users', usersRouter);
app.use('/facility', facilityRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
