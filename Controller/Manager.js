const { MongoClient } = require("mongodb");
const { config } = require("dotenv");
const bcrypt = require("bcrypt");
// import { MongoClient } from "mongodb";
// import bcrypt from "bcrypt";
const client = new MongoClient(
  "mongodb+srv://cosmos:ayomide22689@cosmoscluster.o6ovlp8.mongodb.net/"
);
// import { config } from "dotenv";
config();

const myLibrary = client.db("easylibrary").collection("managers");

async function managerSchema(firstname, lastname, password, email) {
  const encryptPassword = await bcrypt.hash(password, 10);
  const user = myLibrary.insertOne({
    firstname: firstname,
    lastname: lastname,
    password: encryptPassword,
    email: email,
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
  const user = await myLibrary.findOne({ email: email });
  return user;
}

// const newUser = await managerSchema(
//   "ayomide",
//   "chris",
//   "ayomide22689$",
//   "alfredchrisyo@gmail.com"
// );
// console.log(newUser);
// const user = await signIn("alfredchrisyo@gmail.com", "ayomide22689$");
// console.log(user);

module.exports = { managerSchema, signIn };
