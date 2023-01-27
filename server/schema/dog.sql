CREATE TYPE vax AS ENUM('Female-Spayed', 'Male-Neutered', 'Male', 'Female');

CREATE TABLE IF NOT EXISTS dog(
    dog_id serial PRIMARY KEY,
    facility_id INT NOT NULL,
    group_num INT NOT NULL,
    grad_date DATE NOT NULL,
    dog_name VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    shelter VARCHAR(50) NOT NULL,
    breed VARCHAR(50) NOT NULL,
    chip_type VARCHAR(50) NOT NULL,
    chip_num INT NOT NULL,
    gender vax NOT NULL,
    profile_pic VARCHAR(100) NOT NULL,
    alt_name VARCHAR(50) NOT NULL,
    notes VARCHAR(200) NOT NULL,
    adopter_name VARCHAR(50) NOT NULL,
    adopter_phone VARCHAR(11) NOT NULL,
    addr_line VARCHAR(100) NOT NULL,
    adopt_city VARCHAR(50) NOT NULL,
    adopt_state VARCHAR(30) NOT NULL,
    zip VARCHAR(5) NOT NULL,
    adopt_email VARCHAR(100) NOT NULL,
    fees INT NOT NULL,
    revenue INT NOT NULL);

INSERT INTO dog(dog_id, facility_id, group_num, grad_date, dog_name, age, shelter, breed, chip_type, chip_num, gender, profile_pic,
  alt_name, notes, adopter_name, adopter_phone, addr_line, adopt_city, adopt_state, zip, adopt_email, fees, revenue)
VALUES(123456, 987654, 14, '2022-11-15', 'Alex', 10, 'Irvine Animal Care Center', 'Husky', 'A', 123, 'Female-Spayed', 'hi', 'Ale', 'Friendly', 'Ben', '11233455678',
'1234 Apple St', 'Irvine', 'California', '92602', 'adoptedadog@gmail.com', 40, 100);
