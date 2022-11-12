CREATE TABLE facility (
  facility_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  address_line VARCHAR(150) NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip VARCHAR(10) NOT NULL,
  description VARCHAR(500) NOT NULL,
);
