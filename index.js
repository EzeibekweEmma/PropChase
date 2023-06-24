const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Property = require("./models/Property");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const {
  generateRandomPassword,
  sendNewPasswordEmail,
} = require("./settingPassword");

require("dotenv").config();

const app = express();
const PORT = 3000;
const multerUpload = multer({ dest: "uploads/" });

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
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
      description: "About me!",
      avater: "",
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
          { email: existingUser.email, id: existingUser._id },
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
      const { userName, email, _id, description, avater } = await User.findById(
        userData.id
      );
      res.json({ userName, email, _id, description, avater });
    });
  } else {
    res.json(null);
  }
});

app.post("/editProfile", (req, res) => {
  console.log(req.body.formData);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/uploadByLink", async (req, res) => {
  try {
    const { link } = req.body;
    const newName = "propChase-" + Date.now() + ".jpg";
    const options = {
      url: link,
      dest: __dirname + "/uploads/" + newName,
    };

    await imageDownloader.image(options);
    res.status(200).json(newName);
  } catch (error) {
    console.error(error);
    res.status(403).json({
      message:
        "Unable to upload photo. Please check your internet connection, photo link or download to device and use the 'Upload From Device' option to upload photo.",
    });
  }
});

app.post("/uploadFromDevice", multerUpload.array("photos", 20), (req, res) => {
  try {
    const uploadFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const paths = originalname.split(".");
      const ext = paths[paths.length - 1];
      const newPath = path + "." + ext;

      // Rename the file with the appropriate extension
      fs.renameSync(path, newPath);

      // Add the new path to the uploadFiles array
      uploadFiles.push(newPath.replace("uploads\\", ""));
    }
    // Send the uploadFiles array as a JSON response
    res.json(uploadFiles);
  } catch (error) {
    // Handle the error and send an appropriate response
    res.status(500).json({ message: "Failed to upload files" });
  }
});

app.post("/newProperty", async (req, res) => {
  // Create a new property
  try {
    const { token } = req.cookies;
    const {
      title,
      address,
      description,
      extraInfo,
      formPerks: perks,
      addedphoto: photos,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body.formsData;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const newProperty = new Property({
        owner: userData.id,
        title,
        address,
        description,
        extraInfo,
        perks,
        photos,
        checkIn,
        checkOut,
        maxGuests,
      });

      const saveProperty = await newProperty.save();
      res.json({ success: "Okay", saveProperty });
    });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ error: "Error creating property" });
  }
});

app.get("/properties", (req, res) => {
  // Get properties owned by user
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Property.find({ owner: id }));
  });
});

app.get("/property/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Property.findById(id));
});

app.put("/upateProperty", async (req, res) => {
  // Update a property by id
  try {
    const { token } = req.cookies;
    const {
      id,
      title,
      address,
      description,
      extraInfo,
      formPerks: perks,
      addedphoto: photos,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;

      const updateProperty = await Property.findById(id);
      // checking if the property with the provided ID exists
      if (!updateProperty) {
        return res.status(404).json({ error: "Property not found" });
      }

      if (userData.id !== updateProperty.owner.toString()) {
        return res
          .status(403)
          .json({ error: "Unauthorized to update this property" });
      }
      // Updated the property's fields
      updateProperty.set({
        title,
        address,
        description,
        extraInfo,
        perks,
        photos,
        checkIn,
        checkOut,
        maxGuests,
      });

      const updatedProperty = await updateProperty.save();
      res.json({ success: "Okay", updatedProperty });
    });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ error: "Error creating property" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
