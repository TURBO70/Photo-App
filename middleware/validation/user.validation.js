const joi = require("joi");

const methods = ["body", "params"];

const schema = {
  body: joi.object({
    name: joi.string().required().min(3).max(20),
    email: joi.string().required().email(),
    password: joi
      .string()
      .pattern(
        /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      ),
    repassword: joi.ref("password"),
    age: joi.number().required().min(16).max(50),
  }),
  params: joi.object({
    id: joi.string().required().min(4).max(4),
  }),
};

module.exports.userValidation = (req, res, next) => {
  errorArray = [];
  methods.map((key) => {
    const { error } = schema[key].validate(req[key], { abortEarly: false });
    if (error) {
      error.details.map((msg) => {
        errorArray.push({ message: msg.message });
      });
    }
  });
  if (errorArray.length > 0) {
    res.json(errorArray);
  } else {
    next();
  }
};
