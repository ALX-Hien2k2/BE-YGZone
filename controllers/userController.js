const { validateCheck, validateExistence } = require("../middlewares/validation");
const { addOne, findOne } = require("../services/DatabaseServices");
const User = require("../models/user");
const bcrypt = require('bcryptjs');

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

const signIn = async (signInAccount) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = signInAccount;

      // Validate
      validateCheck(
        {
          email: email,
          password: password,

        },
        signInAccount);

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
          resolve(user);
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

const signUp = async (newAccount) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Validate
      validateCheck(
        {
          email: newAccount.email,
          password: newAccount.password,
          fullname: newAccount.fullname,
          phoneNumber: newAccount.phoneNumber,
          // avatar: newAccount.avatar,
          // address: newAccount.address,
          // bank_account_number: newAccount.bank_account_number,
          userType: newAccount.userType,
        },
        newAccount);

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

      // const newUser = await User.create({
      //   email: newAccount.email,
      //   password: hash,
      //   fullname: newAccount.fullname,
      //   phoneNumber: newAccount.phoneNumber,
      //   userType: newAccount.userType,
      //   avatar: newAccount.avatar || "",
      //   address: newAccount.address || "",
      //   bank_account_number: newAccount.bank_account_number || "",
      // });

      // Return new user's info
      console.log("Sign up successfully!")
      resolve(newUser);

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

module.exports = {
  // getUserDetails,
  // getUserList,
  signIn,
  signUp,
};