create table products (
  id serial primary key,
  name varchar(64) unique not null,
  price integer not null
);