create table users (
  id serial primary key,
  firstname varchar(100) not null,
  lastname varchar(100)  not null,
  hashpwd varchar(255) not null
  );