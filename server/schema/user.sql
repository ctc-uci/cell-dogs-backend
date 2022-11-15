create table User(
    id varchar(50) unique not null;
    email varchar(50) primary key not null;
    firstName varchar(50) not null;
    lastName varchar(50) not null;
    facility int not null;
);