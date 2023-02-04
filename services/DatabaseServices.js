const mongoDb = require("mongodb");
const collection = {};

const connectToMongoDb = async (collectionNames) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const mongoDbUrl = process.env.MONGODB_URL;
      console.log("Connecting to MongoDB...", mongoDbUrl);
      const client = new mongoDb.MongoClient(mongoDbUrl);
      await client.connect();
      const db = client.db(process.env.MONGODB_DB_NAME);
      console.log("Connected to MongoDB");
      for (let i = 0; i < collectionNames.length; i++) {
        collection[collectionNames[i]] = db.collection(collectionNames[i]);
      }
      resolve(client);
    } catch (error) {
      reject(error);
    }
  });
  return promise;
};

const createCollectionDataBase = async (collectionNames) => {
  console.log("Creating collections...", collectionNames);
  try {
    const mongoDbUrl = process.env.MONGODB_URL;
    const client = new mongoDb.MongoClient(mongoDbUrl);
    const db = client.db(process.env.MONGODB_DB_NAME);
    if (collectionNames.length <= 0) {
      throw new Exception(500, "Collection Names empty");
    }
    for (let i = 0; i < collectionNames.length; i++) {
      await db
        .createCollection(collectionNames[i])
        .then((res) => {
          console.log(`create new collection ${collectionNames[i]} successed`);
        })
        .catch((e) => {
          console.log(
            `create new collection ${collectionNames[i]} failed`,
            e.message
          );
        });
    }
    client.close();
    return true;
  } catch (error) {
    console.log("Create Collections Error", error);
    return false;
  }
};

module.exports = {
    connectToMongoDb,
    collection,
    createCollectionDataBase,
};