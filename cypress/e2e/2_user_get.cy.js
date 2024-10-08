// ***********************************************
// SET OF TESTS FOR GET METHOD
// ***********************************************
const checkSchema = require("../pages/user_schema");
const token = Cypress.env("token");
const url = `${Cypress.env("ENV_1")}${Cypress.env("subURL")}`;

// Generate new ULR with non-exitent id
let id = Math.floor(Math.random() * 1000);
let url_id = `${url}/${id}`;
let user_id;

describe("USER: set of tests for GET method", () => {
  // GET LIST OF USERS
  it("Should GET list of USERS", () => {
    cy.cmdGET(url, token).then((response) => {
      // Assert response status code
      expect(response.status).to.eq(200);
      // Check fields of last item in array
      let i = response.body.length;
      user_id = response.body[i - 1].id;
      cy.log(user_id);
      expect(response.body[i - 1]).to.have.keys(
        "id",
        "name",
        "email",
        "gender",
        "status"
      );
      // Assert that schema is valid
      expect(
        checkSchema.validateUserData(response.body[i - 1])
      ).to.have.property("success", true);
      cy.log("********************************");
      cy.log("VERIFY GET: LIST OF USERS");
      cy.log("********************************");
      cy.log(`NUMBER OF USERS IN ARRAY: ${i}`);
      cy.log(`BOUNDARY VALUE CHECK OF USER ${i - 1} KEYS`);
      cy.log("VERIFY LIST OF USERS AGAINST SCHEMA");
      cy.log("********************************");
    });
  });

  // VALIDATION CHECK GET OF NON-EXISTENT USER
  it("Should NOT GET user with NON-EXISTENT ID", () => {
    cy.cmdGET(url_id, token).then((response) => {
      // Assert response status code
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq("Resource not found");
      cy.log("********************************");
      cy.log("VERIFY 404 FOR GET NON-EXISTENT USER");
      cy.log(`EXPECT: {"message": "Resource not found"}`);
      cy.log("********************************");
    });
  });

  // VALIDATION CHECK GET OF USER WITH NaN ID
  it("Should NOT GET user with NaN ID", () => {
    // Update ULR with NaN id
    id = "string-is-not-a-nuber";
    url_id = `${url}/${id}`;
    cy.cmdGET(url_id, token).then((response) => {
      // Assert response status code
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq("Resource not found");
      cy.log("********************************");
      cy.log("VERIFY 404 FOR USER WITH NaN ID");
      cy.log(`EXPECT: {"message": "Resource not found"}`);
      cy.log("********************************");
    });
  });

  // VALIDATION CHECK GET OF USER WITH nbsp ID
  it("Should NOT GET user with &nbsp ID", () => {
    // Update ULR with &nbsp id
    id = "&nbsp;";
    url_id = `${url}/${id}`;
    cy.cmdGET(url_id, token).then((response) => {
      // Assert response status code
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq("Resource not found");
      cy.log("********************************");
      cy.log("VERIFY 404 FOR USER WITH &nbsp ID");
      cy.log(`EXPECT: {"message": "Resource not found"}`);
      cy.log("********************************");
    });
  });

  // CHECK GET OF USER WITH INVALID TOKEN
  it("Should NOT GET user with INVALID TOKEN provided", () => {
    // Update ULR with &nbsp id
    let iv_token = "such1token2much3inavalid";
    id = "&nbsp;";
    url_id = `${url}/${user_id}`;
    cy.cmdGET(url_id, iv_token).then((response) => {
      // Assert response status code
      expect(response.status).to.eq(401);
      cy.log("********************************");
      cy.log("VERIFY 401 FOR GET REQUEST WITH INVALID TOKEN");
      cy.log(`INVALID TOKEN: ${iv_token}`);
      cy.log("********************************");
    });
  });
});
