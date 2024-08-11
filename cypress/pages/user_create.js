// Read user_config.json, create userConfig object
const userConfig = require("../fixtures/user_config.json");

// Generate unique user
function generateUniqueEmail(env, dom) {
  const baseEmail = userConfig.email[env];
  const timestamp = Date.now();
  const uniqueIdentifier = `${baseEmail}+${timestamp}`;
  const domain = userConfig.domain[dom];

  return `${uniqueIdentifier}@${domain}`;
}

function generateRandomName() {
  const names = userConfig.names;
  return names[Math.floor(Math.random() * names.length)];
}

function generateRandomGender() {
  const genders = userConfig.gender;
  return genders[Math.floor(Math.random() * genders.length)];
}

function generateRandomStatus() {
  const statuses = userConfig.status;
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function generateUniqueUser(env, dom) {
  const user = {
    "name": `${generateRandomName()}`,
    "email": `${generateUniqueEmail(env, dom)}`,
    "gender": `${generateRandomGender()}`,
    "status": `${generateRandomStatus()}`
  }
  return JSON.stringify(user);
}

module.exports = generateUniqueUser;