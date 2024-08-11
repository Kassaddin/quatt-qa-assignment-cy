const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "junit",
  reporterOptions: {
    mochaFile: "results/[suiteName].xml",
    outputs: true,
    useFullSuiteTitle: true,
    testCaseSwitchClassnameAndName: true,
    toConsole: true,
  },
});

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
