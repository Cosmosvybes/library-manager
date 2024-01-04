const { libraryManagers } = require("../utils/mongodb.js");
const { jwt_ } = require("../utils/jwt.js");
const bcrypt = require("bcrypt");

// import bcrypt from "bcrypt";
// const { config } = require("dotenv");
// import { config } from "dotenv";

async function managerSchema(firstname, lastname, password, email) {
  const encryptPassword = await bcrypt.hash(password, 10);
  const user = libraryManagers.insertOne({
    firstname: firstname,
    lastname: lastname,
    password: encryptPassword,
    email: email,
    restricted: false,
    history: [],
  });
  return user;
}

async function signIn(email, password) {
  const user = await getUser(email);
  return user
    ? (async () => {
        if (!(await bcrypt.compare(password, user.password))) {
          return "invalid password";
        }
        return {
          user,
          isAuthorized: true,
          response: `user logged in succesfully, welcome ${user.email}`,
        };
      })()
    : "user not found";
}

async function getUser(email) {
  const user = await libraryManagers.findOne({ email: email });
  return user;
}
async function userProfile(req, res) {
  let email = req.user.payload
  try {
    const user = await getUser(email);
    res.send({ response: user });
  } catch (error) {
    res.send({ error });
  }
}

async function authenticateSession(req, res) {
  const { email, password } = req.body;
  try {
    const data = await signIn(email, password);

    if (data.isAuthorized) {
      const userToken = jwt_(data.user.email);
      res.cookie("userToken", userToken, { maxAge: 9000000, path: "/api" });
      res.send({ userToken, data });
    } else {
      res.send({ data });
    }
  } catch (error) {
    res.send(error);
  }
}

const signup = async (req, res) => {
  const { firstname, lastname, password, email } = req.body;
  try {
    const data = await managerSchema(firstname, lastname, password, email);
    res.send(data);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { signup, authenticateSession, userProfile };
