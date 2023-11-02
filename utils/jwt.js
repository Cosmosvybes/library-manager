const jwt = require("jsonwebtoken");
const jwt_ = (payload) => {
  const token = jwt.sign({ payload: payload }, "secret", { expiresIn: 900000 });
  return token;
};

module.exports = { jwt, jwt_ };
