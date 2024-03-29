const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.SERVER_PORT;

// Database
const {
  connectToMongoDb,
  createCollectionDataBase,
} = require("./services/DatabaseServices");
const Collections = require("./services/Collections");

const rootRouter = require('./routes/rootRouter');

app.get("/", (req, res) => res.send("Hello! This is the rootRouter"));

// APIs
app.use('/api', rootRouter);

// Database initiation
createCollectionDataBase(new Collections().getListCollections())
  .then((status) => {
    if (status) {
      connectToMongoDb(new Collections().getListCollections())
        .then(() => {
          app.listen(port, () =>
            console.log(`Server started onn port ${port}`)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Create Collection Failed");
      process.exit(1);
    }
  })
  .catch((err) => { });