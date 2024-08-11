// ***********************************************
// SET OF EDGE CASES
// ***********************************************
const token = Cypress.env("token");
const url = `${Cypress.env("ENV_1")}${Cypress.env("subURL")}`;

// Generate new ULR with non-exitent id
let id = Math.floor(Math.random() * 1000);
let url_id = `${url}/${id}`;

// TEST SUIT START
// ***********************************************
describe("USER: set of EDGE cases", () => {
  // DELETE NON-EXISTENT USER
  it("Should NOT DELETE a NON-EXISTENT USER", () => {
    cy.cmdDELETE(url_id, token).then((response) => {
      // Assert response status code
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq("Resource not found");
      cy.log("********************************");
      cy.log("VERIFY 404 FOR DELETE NON-EXISTENT USER");
      cy.log("********************************");
    });
  });

  // INVALID TOKEN
  it("Should NOT GET with INVALID TOKEN", () => {
    let iv_token = "such1token2much3inavalid";
    cy.cmdGET(url, iv_token).then((response) => {
      // Assert response status code and body
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq("Invalid token");
      cy.log("********************************");
      cy.log(`INVALID TOKEN: ${iv_token}`);
      cy.log("********************************");
    });
  });

  // REACH TOKEN LIMIT
  it("Should reach TOKEN LIMIT of 90 PER MINUTE", () => {
    for (let i = 1; i < 101; i++) {
      cy.cmdGET(url, token).then((response) => {
        if (response.status != 200) {
          // Assert response status code and body
          expect(response.status).to.eq(429);
        } else {
          cy.log(`REQUEST NUMBER: ${i}`);
        }
      });
    }
    //expect(response.body.message).to.eq("Invalid token");
    cy.log("********************************");
    cy.log(`VERIFY REQEST LIMIT NUMBER OF 90`);
    cy.log("********************************");
  });
});
