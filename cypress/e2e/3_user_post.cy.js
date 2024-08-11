// ***********************************************
// SET OF TESTS FOR POST METHOD
// ***********************************************
const generateUniqueUser = require("../pages/user_create");

const token = Cypress.env("token");
const url = `${Cypress.env("ENV_1")}${Cypress.env("subURL")}`;

// TEST SUIT START
// ***********************************************
describe("USER: POST validation suite", () => {
  let userId; // Variable to store the user ID
  let url_id; // Variable to store the user ID
  // Body keys and JSONs
  const postUser = generateUniqueUser(0, 0); // Generate new user
  let newUser = {};
  let userName, uniqueEmail, userGender, userStatus;

  // CREATE NEW USER
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
      // Assert response status code and body
      expect(response.status).to.eq(201);
      cy.asrtUserCreate(response); // Custom assertion command
      cy.log("GENERATED USER");
      cy.userLOG(response.body); // Custom log command
      cy.log(`NEW URL WITH ID: ${url_id}`);
    });
  });

  // TRY TO CREATE ANOTHER USER WITH THE SAME EMAIL
  it("Should NOT CREATE another user with SAME E-MAIL", () => {
    // Create another user with the same e-mail
    newUser = {
      name: `new-${userName}`,
      email: `${uniqueEmail}`,
      gender: `${userGender}`,
      status: `${userStatus}`,
    };
    cy.cmdPOST(url, token, newUser).then((response) => {
      // Assert response status code and body
      expect(response.status).to.eq(422);
      expect(response.body[0]).to.have.property("field", "email");
      expect(response.body[0]).to.have.property(
        "message",
        "has already been taken"
      );
      cy.log("NEW USER");
      cy.userLOG(newUser); 
      cy.log(`EXPECT: {"message": "has already been taken"}`);
      cy.log("DELETE USER FROM CASE 1");
    });
    // Delete user from case 1
    cy.cmdDELETE(url_id, token).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  // VALIDATE EMAIL FOR BLANK
  it("Should NOT CREATE user with BLANK E-MAIL", () => {
    newUser = {
      name: `${userName}`,
      email: "",
      gender: `${userGender}`,
      status: `${userStatus}`,
    };
    cy.cmdPOST(url, token, newUser).then((response) => {
      // Assert response status code and body
      expect(response.status).to.eq(422);
      expect(response.body[0]).to.have.property("field", "email");
      expect(response.body[0]).to.have.property("message", "can't be blank");
      cy.log("********************************");
      cy.log("POST USER WITH BLANK E-MAIL");
      cy.log(`EXPECT: {"message": "can't be blank"}`);
      cy.log("********************************");
    });
  });

  // VALIDATE EMAIL FOR INVALID
  it("Should NOT CREATE user with INVALID E-MAIL", () => {
    newUser = {
      name: `${userName}`,
      email: "not-an-email",
      gender: `${userGender}`,
      status: `${userStatus}`,
    };
    cy.cmdPOST(url, token, newUser).then((response) => {
      // Assert response status code and body
      expect(response.status).to.eq(422);
      expect(response.body[0]).to.have.property("field", "email");
      expect(response.body[0]).to.have.property("message", "is invalid");
      cy.log("********************************");
      cy.log("POST USER WITH INVALID E-MAIL");
      cy.log(`EXPECT: {"message": "is invalid"}`);
      cy.log("********************************");
    });
  });
});
// ***********************************************
// DID NOT ADDED VALIDATION CHECKS FOR
// NAME, GENDER AND STATUS
// DUE TO LIMITED TIME
// ***********************************************
