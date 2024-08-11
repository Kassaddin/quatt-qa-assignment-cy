// ***********************************************
// SET OF CHECKS FOR PUT AND PATCH METHODS
// ***********************************************
const generateUniqueUser = require("../pages/user_create");

const token = Cypress.env("token");
const url = `${Cypress.env("ENV_1")}${Cypress.env("subURL")}`;

// TEST SUIT START
// ***********************************************
describe("USER: PUT and PATCH validation suite", () => {
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

  // UPDATE USER WITH PATCH
  it("Should PATCH update USER with VALID BODY", () => {
    // Create another user with modified name and email
    newUser = {
      name: `patch-${userName}`,
      email: `patch-${uniqueEmail}`,
    };
    cy.cmdPATCH(url_id, token, newUser).then((response) => {
      // Assert response status code and body
      expect(response.status).to.eq(200);
      cy.log("PATCH USER");
      cy.userLOG(response.body);
    });
  });

    // UPDATE USER WITH INVALID PUT
    it("Should NOT PUT update USER with INVALID BODY", () => {
      // Create another user with the same e-mail
       newUser = {
        name: `put-${userName}`,
        email: `put-${uniqueEmail}`,
        gender: "invalid",
        status: `${userStatus}`,
      };
      cy.cmdPUT(url_id, token, newUser).then((response) => {
        // Assert response status code and body
        expect(response.status).to.eq(422);
        expect(response.body[0]).to.have.property("field", "gender");
        expect(response.body[0]).to.have.property(
          "message",
          "can't be blank, can be male of female"
        );
        cy.log("PUT USER");
        cy.userLOG(newUser);
        cy.log(`EXPECT: {"message": "can't be blank, can be male of female"}`);
        cy.log("DELETE USER FROM CASE 1");
      });
      // Delete user from case 1
      cy.cmdDELETE(url_id, token).then((response) => {
        expect(response.status).to.eq(204);
      });
    });
});