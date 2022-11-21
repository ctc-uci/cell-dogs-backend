const express = require('express');
const cors = require('cors');

const facilityRouter = require('./routes/facilities');

require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
  }),
);

app.use('/facility', facilityRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
