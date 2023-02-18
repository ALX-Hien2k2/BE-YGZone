const express = require('express');
const {
  // getUserDetails,
  // getUserList,
  signIn,
  signUp,
} = require("../controllers/userController");
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello! This is the get userRouter');
});

router.post('/', (req, res) => {
  res.send('Hello! This is the post userRouter');
});

// router.get('/info/:id', (req, res) => {
//   const user_id = req.params.id;
//   console.log("user_id", user_id);
//   getUserDetails(user_id)
//     .then((userInfo) => {
//       res.status(200).send(userInfo);
//     })
//     .catch((err) => {
//       res.status(err.status).send(err);
//     });
// });

// router.get('/list', (req, res) => {
//   getUserList()
//     .then((userList) => {
//       res.status(200).send(userList);
//     })
//     .catch((err) => {
//       res.status(err.status).send(err);
//     });
// });

router.post("/signin", (req, res) => {
  const signInAccount = req.body;
  console.log("Sign in account: ", signInAccount);
  signIn(signInAccount)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

router.post('/signup', (req, res) => {
  const newAccount = req.body;
  console.log("New account:", newAccount);
  signUp(newAccount)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(err.status).send(err);
    });
});

module.exports = router;