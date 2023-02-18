const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addOne = async (schema, obj) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await schema.create(obj);
            resolve(result);
        } catch (err) {
            reject(err);
        }
    });
};

const findOne = async (schema, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await schema.findOne(filter);
            resolve(result);
        } catch (err) {
            reject(err);
        }
    });
};

// const findAll = async (collectionName, filter, projection) => {
//   const promise = new Promise(async (resolve, reject) => {
//     try {
//       let result = await collection[collectionName].find(filter).project(projection).toArray();
//       resolve(result);
//     } catch (error) {
//       console.log(err);
//       reject(err);
//     }
//   });
//   return promise;
// };

// const insertOne = async (collectionName, obj) => {
//   const promise = new Promise(async (resolve, reject) => {
//     try {
//       let result = await collection[collectionName].insertOne(obj);
//       resolve(result);
//     } catch (error) {
//       console.log(err);
//       reject(err);
//     }
//   });
//   return promise;
// };

module.exports = {
    addOne,
    findOne,
    //   findAll,
    //   insertOne,
};