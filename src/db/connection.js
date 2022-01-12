const { MongoClient } = require("mongodb");

const collections = {};
const getCollections = () => {
  return collections;
};

const connectMongo = async () => {
  const url = process.env.MONGO_URL;

  const client = new MongoClient(url);

  await client.connect();

  const db = client.db("myPractice");

  collections.Posts = db.collection("posts");
};

module.exports = { connectMongo, getCollections };
