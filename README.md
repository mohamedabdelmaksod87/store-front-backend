# Steps to setup, test and run the project

## Setup

1- in terminal run ==> npm install

2- create a dev database: name(store), user(postgres), password(12345)

3- create a test database: name(test), user(postgres), password(12345)

### Note:

in case you want to use another database name, username or password of your choise you will need to replace with those in the .env file

3- create a .env file and add it to project root then set the following enviroment variables:

- NODE_ENV=dev
- PEPPER=!&SKLD-A977$%-4
- TOKEN_SECRET=cc%orr!ek45
- PORT=3000
- DB_HOST=localhost
- DB_PORT=5432
- DB_USER=postgres
- DB_PASSWORD=12345
- DB_NAME=store
- DB_TEST_NAME=test

## Testing

in terminal run ==> npm run test

## Run the Project

1- in terminal run ==> db-migrate up
this will create necessary tables before start using our application

2- in terminal run ==> npm start
this will run the server on port 3000

3- check the REQUIREMENTS.md file to start using all availabel endpoints
it is recommended to create one user first before using available endpoints since most of them require jwt token first to access the protected routes.
