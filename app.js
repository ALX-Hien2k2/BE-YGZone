const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./config/database');
const cors = require("cors");

const app = express();
// Setup .env
dotenv.config();

const PORT = process.env.SERVER_PORT;

const rootRouter = require('./routes/rootRouter');

// Use express middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// APIs
app.use('/api', rootRouter);

// Test API call
app.get("/", (req, res) => res.send("Hello! This is the rootRouter"));

// Connect to database
connectToDatabase()
    .then(() => {
        app.listen(PORT, () =>
            console.log(`Server started onn port ${PORT}`)
        );
    });