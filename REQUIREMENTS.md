# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

======================================================================

## Project Endpoints

### User Endpoints:

1- creat new user ==> /user (POST)
req.body data needed: firstname(string), lastname(string), password(string).

2- list all users ==> /user (GET)
data needed: jwt token in request header authorization ex: 'Bearer token'

3- find user by id ==> /user/:id (GET) where id is a number
data needed: jwt token in request header authorization ex: 'Bearer token'

### Product Endpoints:

1- creat new product ==> /product (POST)
req.body data needed: name(string), price(string).
data needed: jwt token in request header authorization ex: 'Bearer token'

2- list all products ==> /product (GET)

3- find product by id ==> /product/:id (GET) where id is a number

### Order Endpoints:

1- creat new order ==> /order (POST)
req.body data needed: status(string) ex: 'active or inactive'
data needed: jwt token in request header authorization ex: 'Bearer token'

2- add product to order ==> /order/:id/addproduct (POST)
where id(number) is the order id
req.body data needed: quantity(number), product_id(number)
data needed: jwt token in request header authorization ex: 'Bearer token'

3- find user orders ==> /order/userorders (GET)
data needed: jwt token in request header authorization ex: 'Bearer token'

======================================================================

## DB Tables

### users table:

1- id serial primary key,
2- firstname varchar(100) not null,
3- lastname varchar(100) not null,
4- hashpwd varchar(255) not null

### products table:

1- id serial primary key,
2- name varchar(64) unique not null,
3- price integer not null

### orders table:

1- id serial primary key,
2- status varchar(25) not null,
3- user_id INTEGER REFERENCES users(id) ON DELETE CASCADE ==> foreign key to users table.

### order_products table:

1- id serial primary key,
2- quantity integer not null,
3- order_id integer REFERENCES orders(id) ON DELETE CASCADE, ==> foreign key to orders table.
4- product_id integer REFERENCES products(id), ==> foreign key to users table.
5- unique(order_id, product_id)
