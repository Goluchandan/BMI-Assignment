const express = require('express')
const router = express.Router()
const UserModel = require("../Model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body
    const user = await UserModel.findOne({ email: email })
    if (user) {
      res.send({ "status": "failed", "message": "Email already exists" })
    } else {
      if (name && email && password && password.length >= 6) {
          try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const doc = new UserModel({
              name: name,
              email: email,
              password: hashPassword,
            })
            await doc.save()
            const saved_user = await UserModel.findOne({ email: email })
            // Generate JWT Token
            const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
          } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Unable to Register" })
          }
       
      }
      else if( password.length < 6){
        res.send({ "status": "failed", "message": "Password must be greater Than 6 Character" })
      }
       else {
        res.send({ "status": "failed", "message": "All fields are required" })
      }
    }
})


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        if (email && password) {
          const user = await UserModel.findOne({ email: email })
          if (user != null) {
            const isMatch = await bcrypt.compare(password, user.password)
            if ((user.email === email) && isMatch) {
              // Generate JWT Token
              const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
              res.send({ "status": "success", "message": "Login Success", "token": token, "userId" : user._id })
            } else {
              res.send({ "status": "failed", "message": "Email or Password is not Valid" })
            }
          } else {
            res.send({ "status": "failed", "message": "You are not a Registered User" })
          }
        } else {
          res.send({ "status": "failed", "message": "All Fields are Required" })
        }
    } 
    catch (error) {
        console.log(error)
        res.send({ "status": "failed", "message": "Unable to Login" })
     }
})


// router.get("/:userId/get/signup", async (req, res) => {
//   const userId = req.params.userId
//   const userInfo = await UserModel.findOne({userId});
//   res.send(userInfo);
// });

router.get("/:userId/get/signup", async (req, res) => {
  try {
    const signUpUser = await UserModel.findById(req.params.userId);
    res.status(200).json(signUpUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;