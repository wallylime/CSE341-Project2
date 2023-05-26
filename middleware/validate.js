const Validator = require('validatorjs');
const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

const saveChore = (req, res, next) => {
  const validationRule = {
    choreName: 'required|string',
    estimatedTime: 'required|string',
    indoor: 'required|boolean',
    outdoor: 'required|boolean',
    spring: 'required|boolean',
    summer: 'required|boolean',
    fall: 'required|boolean',
    winter: 'required|boolean'
  };
  
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveChore
};