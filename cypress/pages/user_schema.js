const Ajv = require('ajv');
const addFormats = require("ajv-formats")

const ajv = new Ajv();
addFormats(ajv);

// Define the JSON schema
const userSchema = {
  properties: {
    id: {
      type: 'integer',
      description: 'Unique identifier for the user.',
    },
    name: {
      type: 'string',
      description: 'Name of the user.',
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'Email address of the user.',
    },
    gender: {
      type: 'string',
      enum: ['male', 'female'],
      description: 'Gender of the user.',
    },
    status: {
      type: 'string',
      enum: ['active', 'inactive'],
      description: 'Status of the user account.',
    },
  },
  required: ['name', 'email', 'gender', 'status'],
  additionalProperties: false,
};

// Compile the schema
const validate = ajv.compile(userSchema);

// Function to validate data against the schema
function validateUserData(data) {
  const valid = validate(data);
  if (!valid) {
    return {
      success: false,
      errors: validate.errors,
    };
  }
  return {
    success: true,
    data,
  };
}

// Export the schema and validation function
module.exports = {
  userSchema,
  validateUserData,
};