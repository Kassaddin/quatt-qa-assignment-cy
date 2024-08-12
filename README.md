# QUATT ASSIGNMENT
QA framework outline for the [Quatt](https://www.quatt.io/) assignment.

## Description
### Assignment
> Create e2e test scenarios for the CRUD user operations with API Version 2 and HTTP Bearer Token authentication from https://gorest.co.in/ service. Use JavaScript or TypeScript and a framework of your choice (for example Jest and Supertest, please don't use Postman for this).
### Approach
1. Gather data and outline scope.
2. Prepare  [primary documentation](https://docs.google.com/spreadsheets/d/1QJ5d27kjzJzKOpvyQAeB6tHe0FMh2BDyT5neeIqtbow/edit?usp=sharing).
3. Define tools and structure.
4. Create a frame.
5. Write tests.
6. Add quality of life things.
### Tools
1. **[Cypress](https://www.cypress.io/)** - end-to-end testing framework designed for web applications.
2. **[AJV](https://ajv.js.org/)** - Another JSON Validator is a fast and flexible JavaScript library for validating JSON schemas.
### Structure
- **.cypress/pages** - used to allocate often used functions into a separate block.
	- **user_create.js** - generated user with unique email.
	- **user_schema.js** - defines JSON schema of the user and validates it.
- **.cypress/support/commands.js** - use to add a custom command to streamline the process and shorten the code.
	- Commands for CRUD - POST, PUT, PATCH, GET, DELETE.
	- Command for Assertions - to assert that created user has all the needed properties.
	- Commands for shortening logs - for clear information in the Cypress UI.
- **.cypress/fixtures** - a fixed set of data located in a files.
	- **user_config.json** - test-data used in e2e scripts.
- **./cypress.env.json** - file with the environment variables, yields:
	- **ENV_1** - path to the [current test-environment](https://gorest.co.in/).
	- **subURL** - often used part of URL.
	- **token** - while its never expires can set here. 
- **.cypress/e2e** - divided test suits.
	- **1_user_e2e.cy.js** - full path for a user POST->GET->PUT->DELETE.
	- **2_user_get.cy.js** - set of tests for the GET method.
	- **3_user_post.cy.js** - set of tests for the POST method.
	- **4_user_put.cy.js** - set of tests for the PUT and PATCH method.
	- **5_user_edge.cy.js** - set of edge cases.

## Getting Started
### Installing
1. Install **[Node.js](https://nodejs.org/en/download)**.
2. Check version of **npm** and **Node.js**: 
```
node -v
npm -v
```
3. Install **[Cypress Framework](https://www.cypress.io/)** via `npm`:
```
npm install cypress --save-dev
```

### Executing program
Run **[Cypress](https://www.cypress.io/)**
- Run cypress with ui, can run scripts by file
```
npm run ui
```
- Run all tests in a chrome headed mode
```
npm run e2e
```
- Run all tests in a chrome headless mode
```
npm run e2ehl
```

## Authors
Aleksander Pichkurov: [LinkedIn](https://www.linkedin.com/in/alexander-pichkurov-99971a183/) | [Email](mailto:kassaddin@gmail.com) | [Telegram](https://t.me/kassaddin)

## License
This project is licensed under the [ISC License](https://opensource.org/license/isc-license-txt).