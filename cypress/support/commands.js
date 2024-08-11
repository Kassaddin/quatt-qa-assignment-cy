// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ***********************************************
// CRUD METHODS COMMANDS WITH BEARER TOKEN
// ***********************************************
// POST
Cypress.Commands.add("cmdPOST", (url, token, body) => {
  cy.request({
    method: "POST",
    url: url,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body,
  });
}),
  // PUT
  Cypress.Commands.add("cmdPUT", (url, token, body) => {
    cy.request({
      method: "PUT",
      url: url,
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: body,
    });
  }),
  // PATCH
  Cypress.Commands.add("cmdPATCH", (url, token, body) => {
    cy.request({
      method: "PATCH",
      url: url,
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: body,
    });
  }),
  // GET
  Cypress.Commands.add("cmdGET", (url, token) => {
    cy.request({
      method: "GET",
      url: url,
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }),
  // DELETE
  Cypress.Commands.add("cmdDELETE", (url, token) => {
    cy.request({
      method: "DELETE",
      url: url,
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }),
  // ***********************************************
  // ASSERTIONS
  // ***********************************************
  // USER CREATION
  Cypress.Commands.add("asrtUserCreate", (response) => {
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("name");
    expect(response.body).to.have.property("email");
    expect(response.body).to.have.property("gender");
    expect(response.body).to.have.property("status");
  });
// ***********************************************
// MISC COMMANDS
// ***********************************************
// USER CY.LOG
Cypress.Commands.add("userLOG", (user) => {
  cy.log("********************************");
  cy.log(`ID: ${user.id}`);
  cy.log(`NAME: ${user.name}`);
  cy.log(`E-MAIL: ${user.email}`);
  cy.log(`GENDER: ${user.gender}`);
  cy.log(`STATUS: ${user.status}`);
  cy.log("********************************");
});
// OBJECT USER CY.LOG
Cypress.Commands.add("userOLOG", (user) => {
  cy.log("********************************");
  cy.log(`${user}`);
  cy.log("********************************");
});
