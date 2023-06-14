const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const {
  generateRandomPassword,
  sendNewPasswordEmail,
} = require("./settingPassword");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const jwtSecret = "kjfjfdljfdjflnv  eirieninrv enrin";

// Routes
app.get("/test", (req, res) => {
  res.json({ text: "Okay" });
});

app.post("/signUp", async (req, res) => {
  try {
    let { userName, email, password, confirmPassword } = req.body.formData;

    // Trim and setting to lowercase
    email = email.trim().toLowerCase();
    //  capitalize the first letters of each word in a userName
    userName = userName
      .toLowerCase()
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Check if email already exists and if password matches
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(409)
        .json({ message: `Error: ${email} already exists` });
    else if (confirmPassword !== password)
      return res.status(400).json({ message: "Passwords do not match" });

    const bcryptSalt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.json({ success: "Okay", savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    let { email, password, rememberMe } = req.body.formData;

    // Trim and setting to lowercase
    email = email.trim().toLowerCase();

    // Find user by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Compare the provided password with the stored password
      const isPasswordValid = bcrypt.compareSync(
        password,
        existingUser.password
      );

      if (isPasswordValid) {
        // Generate a JWT token with the user's email and id
        jwt.sign(
          { email: existingUser.email, id: existingUser._id},
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            // Set the token as a cookie and send a success response
            res.cookie("token", token).status(200).json(existingUser);
          }
        );
      } else {
        // Incorrect password
        res.status(422).json({ message: "Incorrect password" });
      }
    } else {
      // User not found
      res.status(404).json({ message: "User doesn't exists" });
    }
  } catch (error) {
    // Error handling
    console.error("Error logging user:", error);
    res.status(500).json({ error: "Error logging user" });
  }
});

app.post("/resetPassword", async (req, res) => {
  try {
    let { email } = req.body.formData;
    // Trim and setting to lowercase
    email = email.trim().toLowerCase();
    // Find user by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Generate a new password
      const newPassword = generateRandomPassword();

      // Update the user's password in the database
      existingUser.password = bcrypt.hashSync(newPassword, 10);
      await existingUser.save();

      // Send the new password to the user (e.g., via email)
      // sendNewPasswordEmail(existingUser.email, newPassword);
      console.log(existingUser.email, newPassword);
      res.status(200).json({ message: "Password reset successful" });
    } else {
      // User not found
      res.status(404).json({ message: "User doesn't exists" });
    }
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Error resetting password" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {userName, email, _id} = await User.findById(userData.id)
      res.json({userName, email, _id});
    });
  } else {
    res.json(null);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
