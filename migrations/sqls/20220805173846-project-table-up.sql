create table users (
  id serial primary key,
  firstname varchar(100) not null,
  lastname varchar(100)  not null,
  hashpwd varchar(255) not null
  );

create table products (
  id serial primary key,
  name varchar(64) unique not null,
  price integer not null
);

create table orders (
  id serial primary key,
  status varchar(25) not null,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

create table order_products (
  id serial primary key,
  quantity integer not null,
  order_id integer REFERENCES orders(id) ON DELETE CASCADE,
  product_id integer REFERENCES products(id),
  unique(order_id, product_id)
);