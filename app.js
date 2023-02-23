const express = require('express');
const cors = require('cors');
const dog = require('./routes/dog');
require('dotenv').config();

const facilityRouter = require('./routes/facility');
const usersRouter = require('./routes/users');

const app = express();

const PORT =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 3001
    : process.env.REACT_APP_PROD_PORT;

app.use(
  cors({
    origin: `${
      !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_HOST
        : process.env.REACT_APP_PROD_HOST
    }`,
    credentials: true,
  }),
);

app.use(express.json());
app.use('/dog', dog);
app.use('/users', usersRouter);
app.use('/facility', facilityRouter);

app.get('/lebronjames', (req, res) => {
  return res.status(200).send('lebron james!');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
