const genUser = require('./cypress/pages/user_create');
const userSchema = require('./cypress/pages/user_schema');

const user = genUser(0,1);
console.log("Generated user: ", user);

const validate = userSchema.validateUserData(user);
console.log("Validation log: ", validate);