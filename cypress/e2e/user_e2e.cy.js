// ***********************************************
// FULL PATH FOR A USER: POST->GET->PUT->DELETE
// ***********************************************
const checkSchema = require("../pages/user_schema");
const generateUniqueUser = require("../pages/user_create");

const token = Cypress.env("token");
const url = `${Cypress.env("ENV_1")}${Cypress.env("subURL")}`;

// TEST SUIT START
// ***********************************************
describe("USER: full e2e path POST->GET->PUT->DELETE", () => {
  let userId; // Variable to store the user ID
  let url_id; // Variable to store the user ID
  // Body keys and JSONs
  const postUser = generateUniqueUser(0, 0); // Generate new user
  let putUser = {};
  let userName, uniqueEmail, userGender, userStatus;

  // POST
  it("Should CREATE a new USER", () => {
    cy.cmdPOST(url, token, postUser).then((response) => {
      // Store the user ID for later use
      userId = response.body.id;
      url_id = `${url}/${userId}`;
      // Populate body keys with values
      userName = response.body.name;
      uniqueEmail = response.body.email;
      userGender = response.body.gender;
      userStatus = response.body.status;
      // Create PUT body
      putUser = {
        name: `up-${userName}`,
        email: `up-${uniqueEmail}`,
        gender: `${userGender}`,
        status: `${userStatus}`,
      };
      // Assert response status code and body
      expect(response.status).to.eq(201);
      cy.asrtUserCreate(response); // Custom assertion command
      cy.log("GENERATED USER");
      cy.userLOG(response.body); // Custom log command
      cy.log(`NEW URL WITH ID: ${url_id}`);
    });
  });

  // GET
  it("Should GET the user by ID", () => {
    // Wait for the previous POST request to complete and userId to be set
    cy.cmdGET(url_id, token).then((response) => {
      // Assert response status code and body
      expect(response.status).to.eq(200);
      // Assert that schema is valid
      expect(checkSchema.validateUserData(response.body)).to.have.property(
        "success",
        true
      );
      cy.log("********************************");
      cy.log("GET USER TO VERIFY SUCCESSFUL POST");
      cy.log("********************************");
    });
  });

  // PUT
  it("Should UPDATE newly created USER", () => {
    cy.cmdPUT(url_id, token, putUser).then((response) => {
      // Assert response status code and body
      expect(response.status).to.eq(200);
      cy.asrtUserCreate(response);
      cy.log("UPDATED USER");
      cy.userLOG(response.body);
    });
  });

  // DELETE
  it("Should DELETE newly created USER", () => {
    cy.cmdDELETE(url_id, token).then((response) => {
      // Assert response status code
      expect(response.status).to.eq(204);
    });
    // Assert that user with used ID is not found
    cy.cmdGET(url_id, token).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq("Resource not found");
      cy.log("********************************");
      cy.log("VERIFY DELETE");
      cy.log(`EXPECT: {"message": "Resource not found"}`);
      cy.log("********************************");
    });
  });
});
