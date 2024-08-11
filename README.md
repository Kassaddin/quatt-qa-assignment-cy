# **QUATT assignment by Aleksander Pichkurov**
Expectations:
1. Autotests as part of acceptance testing suite that build overtime
2. Can be run locally
3. Coverage by page to verify components in place and behave as expected
4. Visual regression (screenshots compare)
5. Lighthouse integration
6. Env for autotests - DEV-1

## **Tools Used**
The automation scripts have been created using **[Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)** functionality of **[Cypress Framework](https://www.cypress.io/)**.

## **Install and Setup**
1. Install **[Node.js](https://nodejs.org/en/download)**.
2. Check version of **npm** and **Node.js**: 
```
node -v
npm -v
```
3. Install **[Cypress Framework](https://www.cypress.io/)**
```
npm install cypress --save-dev
```
4. Run **[Cypress](https://www.cypress.io/)**

- Run cypress with ui, can run scripts by file
```
npm run ui
```
- Run all tests in a chrome headless with image-diff headed mode
```
npm run e2e
```
- Run all tests in a chrome force-headless mode
```
npm run e2ehl
```
- The *commands.js* file located in *cypress/support* folder has various commands to invoke elements by their locators with the ID or NAME or other attributes as variables.
- The default config file is *cypress.config.js* it has the parameters that will be used to run test or can be used in the comaands.

## **Reports**
- Scenario reports can be found in *reports/* folder, for each scenario.
- Visual diff reports can be found in *cypress-image-diff-html-report/* folder, visual and JSON representation.
- **WARNING: all the reports will overwrite themselves with each new run**

## **Scenarios examples**
- In the *cypress/e2e* folder file *exmaple.cy.js* can be used as an example with multiple tests covering the happy path.

## **How to create and run the scripts** 
- Create new folders and files in *cypress/e2e* folder.
- Run trough the **Cypress runner** as an **e2e tests** with a browser of your liking.

---