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

const rootRoute = require('./routes/rootRoute');

app.get("/", (req, res) => res.send("Hello! This is the root route"));

app.use('/api', rootRoute);

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