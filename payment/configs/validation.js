//import validatejs from 'validate.js';
var validatejs = require("validate.js");

const validation = {
  id: {
    presence: true,
    length: {
      minimum: 1,
      message: "must be at least 1 characters"
    }
  },
  com: {
    presence: true,
    length: {
      minimum: 4,
      message: "must be at least 1 characters"
    }
  },
  name: {
    presence: true,
    length: {
      minimum: 6,
      message: "must be at least 6 characters"
    }
  },
  username: {
    presence: {
      message: 'Please enter Username'
    },
    length: {
      minimum: 3,
      message: "Must be at least 6 characters"
    },
    format: {
      pattern: /^[a-zA-Z0-9\-\_\.]+$/,
      message: 'Please enter a valid username'
    }
  },
  email: {
    presence: {
      message: '^Please enter an email address'
    },
    format: {
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: '^Please enter a valid email address'
    }
  },
  phone: {
    presence: true
  },
  pass: {
    presence: true,
    length: {
      minimum: 1,
      message: "must be at least 1 characters"
    }
  },
  pass2: {
    equality: "pass",
    length: {
      minimum: 1,
      message: "must be at least 1 characters"
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 1,
      message: "must be at least 1 characters"
    }
  }
};

export default function validate(fieldName, value, compare = []) {
  // Validate.js validates your values as an object
  // e.g. var form = {email: 'email@example.com'}
  // Line 8-9 creates an object based on the field name and field value
  var formValues = {};
  if (compare) {
    formValues[compare[0]] = compare[1];
  }

  formValues[fieldName] = value;

  // Line 13-14 creates an temporary form with the validation fields
  // e.g. var formFields = {
  //                        email: {
  //                         presence: {
  //                          message: 'Email is blank'
  //                         }
  //                       }
  var formFields = {}
  formFields[fieldName] = validation[fieldName]


  // The formValues and validated against the formFields
  // the variable result hold the error messages of the field
  const result = validatejs(formValues, formFields)
  //console.log(result);
  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result[fieldName][0]
  }

  return null
}
