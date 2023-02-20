const { registerValidator, signInValidator } = require("../validations/auth");
const { addOne, findOne } = require("../services/DatabaseServices");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const getUserDetails = async (user_id) => {
//   const promise = new Promise(async (resolve, reject) => {
//     try {
//       const userInfo = await findOne(new Collections().user, { _id: new ObjectId(user_id) });
//       if (userInfo) {
//         console.log(userInfo);
//         resolve(userInfo);
//       } else {
//         console.log("User not found");
//         reject({
//           status: 404,
//           message: "User not found"
//         });
//       }
//     } catch (err) {
//       console.log("err", err);
//       reject({
//         status: 400,
//         message: err.message
//       });
//     }
//   });
//   return promise;
// };

// const getUserList = async () => {
//   const promise = new Promise(async (resolve, reject) => {
//     try {
//       const userList = await findAll(new Collections().user, {}, {
//         _id: 1,
//         username: 1,
//         fullname: 1,
//         email: 1,
//         phone: 1,
//         avatar: 1,
//         address: 1,
//         user_type: 1,
//       });
//       if (userList) {
//         console.log(userList);
//         resolve(userList);
//       } else {
//         console.log("List not found");
//         reject({
//           status: 404,
//           message: "List not found"
//         });
//       }
//     } catch (err) {
//       console.log("err", err);
//       reject({
//         status: 400,
//         message: err.message
//       });
//     }
//   });
//   return promise;
// };

const signUp = async (newAccount) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Validate
      const { error } = registerValidator(newAccount);

      if (error) {
        console.log("Error message:", error.details[0].message)
        reject({
          status: 422,
          message: error.details[0].message,
        });
      } else {
        // hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newAccount.password, salt);

        // Create new user and add to database
        const newUser = await addOne(User, {
          email: newAccount.email,
          password: hash,
          fullname: newAccount.fullname,
          phoneNumber: newAccount.phoneNumber,
          userType: newAccount.userType,
          avatar: newAccount.avatar || "",
          address: newAccount.address || "",
          bank_account_number: newAccount.bank_account_number || "",
        });

        console.log("New user:", newUser);

        // Create token
        const token = jwt.sign(
          { id: newUser._id, email: newUser.email },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );

        newUser.token = token;

        console.log("New user:", newUser);

        // Return new user's info
        console.log("Sign up successfully!")
        resolve(newUser);
      }
    } catch (err) {
      console.log("Error message:", err.message);

      if (err.code === 11000) {
        reject({
          status: 409,
          message: "Email address is already in use."
        });
      } else {
        reject({
          status: 500,
          message: "Unable to create user."
        });
      }
    }
  });
};

const signIn = async (signInAccount) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Validate
      const { error } = signInValidator(signInAccount);

      if (error) {
        console.log("Error message:", error.details[0].message)
        reject({
          status: 422,
          message: error.details[0].message,
        });
      } else {
        const { email, password } = signInAccount;

        // Find user by email
        const user = await findOne(User, { email: email });
        if (!user) {
          reject({
            status: 401,
            message: "Invalid email or password"
          });
        } else {
          // Check password
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            reject({
              status: 401,
              message: "Invalid email or password"
            });
          } else {
            console.log("Sign in successfully!")

            // Create token
            const token = jwt.sign(
              { id: user._id, email: user.email },
              process.env.TOKEN_SECRET,
              {
                expiresIn: "30s",
              }
            );

            user.token = token;

            resolve(user);
          }
        }
      }
    } catch (err) {
      console.log("Error message: ", err.message);

      reject({
        status: 500,
        message: err.message
      });
    }
  });
};

module.exports = {
  // getUserDetails,
  // getUserList,
  signIn,
  signUp,
};