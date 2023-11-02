const { jwt } = require("../utils/jwt");

const Auth = (req, res, next) => {
  const token = req.cookies.userToken;
  if (!token) {
    res.send({ response: "unauthorized page, sign in" });
  }
  const authenticate = jwt.verify(token, "secret");
  req.user = authenticate;
  next();
};

module.exports = Auth;
