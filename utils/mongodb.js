const { MongoClient } = require("mongodb");
const { config } = require("dotenv");
const bcrypt = require("bcrypt");
// import bcrypt from "bcrypt";
// import { MongoClient } from "mongodb";
// import { config } from "dotenv";

const client = new MongoClient(
  "mongodb+srv://cosmos:ayomide22689@cosmoscluster.o6ovlp8.mongodb.net/"
);
// import { config } from "dotenv";
config();

const libraryManagers = client.db("easylibrary").collection("managers");
const books = client.db("easylibrary").collection("books");
module.exports = { libraryManagers, books };
