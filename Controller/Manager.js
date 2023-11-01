const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://cosmos:ayomide22689@cosmoscluster.o6ovlp8.mongodb.net/"
);
const { config } = require("dotenv");
config();
const myLibrary = client.db("easylibrary").collection("managers");

async function managerSchema() {
  const user = myLibrary.insertOne({
    firstname: "Alfred",
    lastname: "chris",
    password: "Ayomide22689$",
    email: "alfredchrisya@gmail.com",
  });
  return user;
}
module.exports = { managerSchema };
