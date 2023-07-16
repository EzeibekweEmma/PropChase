const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Property = require("./models/Property");
const Booking = require("./models/Booking");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const {
  generateRandomPassword,
  sendNewPasswordEmail,
} = require("./models/resetPassword");
const mime = require("mime-types");

require("dotenv").config();

const app = express();
const multerUpload = multer({ dest: "/tmp" });

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//   });

const bucket = "prop-chase"; // S3 bucket name

async function uploadToS3(path, originalFilename, mimetype) {
  const client = new S3Client({
    region: "eu-west-3", // AWS region where the S3 bucket is located
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFilename.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = "PropChase-" + Date.now() + "." + ext; // Generate a new filename using the current timestamp
  await client.send(
    new PutObjectCommand({
      Bucket: bucket, // Name of the S3 bucket to upload to
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype, // MIME type of the file
      ACL: "public-read", // Access control setting for the uploaded file
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

const jwtSecret = process.env.JWTSECRET_KEY;

// Routes
app.get("/api", (req, res) => {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
  res.json({ connection: "Okay" });
});

app.post("/api/signUp", async (req, res) => {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
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

app.post("/api/login", async (req, res) => {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
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
            res
              .cookie("token", token, {
                secure: true, // Set to true if served over HTTPS
                sameSite: "none",
              })
              .status(200)
              .json(existingUser);
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

app.post("/api/logout", (req, res) => {
  res
    .cookie("token", "", {
      secure: true, // Set to true if served over HTTPS
      sameSite: "none",
    })
    .json(true);
});

app.post("/api/resetPassword", async (req, res) => {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
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
      sendNewPasswordEmail(
        existingUser.email,
        existingUser.userName,
        newPassword
      );
      res.status(200).json({
        message: "Password reset successful",
      });
    } else {
      // User not found
      res.status(404).json({ message: "User doesn't exists" });
    }
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Error resetting password" });
  }
});

app.get("/api/profile", (req, res) => {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
  // Retrieve user profile data
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      // checks for a token in the cookies and verifies it using the jwt.verify method
      if (err) throw err;
      try {
        const { userName, email, _id, description, avater } =
          await User.findById(userData.id);
        res.json({ userName, email, _id, description, avater });
      } catch (err) {
        res.json(null);
      }
    });
  } else {
    res.json(null);
  }
});

app.get("/api/getProfile", async (req, res) => {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
  // Retrieve user profile data
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      // checks for a token in the cookies and verifies it using the jwt.verify method
      if (err) throw err;
      const { userName, description, avater } = await User.findById(
        userData.id
      );
      res.json({ userName, description, avater });
    });
  } else {
    res.json(null);
  }
});

app.put("/api/editProfile", async (req, res) => {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
  // Update a user Profile
  try {
    const { token } = req.cookies;
    const { userName, oldPassword, newPassword, avater, description } =
      req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      // checks for a token in the cookies and verifies it using the jwt.verify method
      if (err) throw err;

      const editProfile = await User.findById(userData.id);

      if (oldPassword) {
        // if oldPassword exist - compare the provided oldPassword with
        // the hashed password stored in the editProfile object
        let errorMessage;
        try {
          const isPasswordValid = bcrypt.compareSync(
            oldPassword,
            editProfile.password
          );
          // if isPasswordValid is false password did't match
          if (!isPasswordValid) {
            errorMessage = "Sorry! password didn't match previous password";
            throw new Error(errorMessage);
          } else if (oldPassword === newPassword) {
            // oldPassword and newPassword shouldn't match
            errorMessage =
              "Sorry! new password can't be the same with old password!";
            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error(errorMessage + ":", error);
          res.status(403).json({ message: errorMessage });
          return;
        }
        const bcryptSalt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, bcryptSalt);
        editProfile.set({ password: hashedPassword });
      }

      // Updated the user's fields
      editProfile.set({
        userName,
        avater,
        description,
      });

      const editedProfile = await editProfile.save();
      res.json({ success: "Okay", editedProfile });
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Error updating profile" });
  }
});

app.post(
  "/api/uploadSinglePhoto",
  multerUpload.single("photo"),
  async (req, res) => {
    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URL);
    try {
      const { path, originalname, mimetype } = req.file;
      const url = await uploadToS3(path, originalname, mimetype);

      res.json(url);
    } catch (error) {
      // Handle the error and send an appropriate response
      res.status(500).json({ message: "Failed to upload file" });
    }
  }
);

app.post("/api/uploadByLink", async (req, res) => {
  // Endpoint to handle photo upload by link
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
  try {
    const { link } = req.body;
    // Generate a unique name for the image using the current timestamp
    const newName = "propChase-" + Date.now() + ".jpg";
    // Set up options for image download
    const options = {
      url: link, // The URL from which the image will be downloaded
      dest: "/tmp/" + newName, // The destination path for the downloaded image
    };
    // Download the image using the imageDownloader library
    await imageDownloader.image(options);
    // Upload the downloaded image to an S3 bucket
    const url = await uploadToS3(
      "/tmp/" + newName, // Local path of the downloaded image
      newName, // Name of the image file
      mime.lookup(options.dest) // Get the mime type of the image
    );
    res.status(200).json(url);
  } catch (error) {
    console.error(error);
    res.status(403).json({
      message:
        "Unable to upload photo. Please check your internet connection, photo link or download to device and use the 'Upload From Device' option to upload photo.",
    });
  }
});

app.post(
  "/api/uploadFromDevice",
  multerUpload.array("photos", 50),
  async (req, res) => {
    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URL);
    try {
      const uploadFiles = [];
      for (let i = 0; i < req.files.length; i++) {
        const { path, originalname, mimetype } = req.files[i];
        const url = await uploadToS3(path, originalname, mimetype);
        uploadFiles.push(url);
      }
      // Send the uploadFiles array as a JSON response
      res.json(uploadFiles);
    } catch (error) {
      // Handle the error and send an appropriate response
      res.status(500).json({ message: "Failed to upload files" });
    }
  }
);

app.post("/api/newProperty", async (req, res) => {
  // Create a new property
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
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
      price,
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
        price,
      });

      const saveProperty = await newProperty.save();
      res.json({ success: "Okay", saveProperty });
    });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ error: "Error creating property" });
  }
});

app.get("/api/userProperty", (req, res) => {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
  // Get properties owned by user
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Property.find({ owner: id }));
  });
});

app.delete("/api/deleteProperty/:id", async (req, res) => {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
  // Define an endpoint for deleting a property document by its ID
  const { id: propID } = req.params;
  // Get the authentication token from the request cookies
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    // Verify the JWT token to get user data (ID)
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    const { id: userId } = userData;

    try {
      const property = await Property.findOneAndDelete({
        _id: propID,
        owner: userId,
      });

      if (!property) {
        // If the property document is not found, send a 404 Not Found response
        return res.status(404).json({ message: "Property not found" });
      }
      // If the deletion is successful, send a 200 OK response
      return res.sendStatus(200);
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  });
});

app.get("/api/property/:id", async (req, res) => {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  const propertyId = await Property.findById(id);
  const userInfo = await User.findById(propertyId.owner);
  // Create a JSON response object that includes the property details, avater, and userName
  res.json({
    ...propertyId.toObject(),
    avater: userInfo.avater,
    userName: userInfo.userName,
  });
});

app.put("/api/upateProperty", async (req, res) => {
  // Update a property by id
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
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
      price,
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
        price,
      });

      const updatedProperty = await updateProperty.save();
      res.json({ success: "Okay", updatedProperty });
    });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ error: "Error creating property" });
  }
});

app.get("/api/properties", async function (req, res) {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
  res.json(await Property.find());
});

app.post("/api/booking", async (req, res) => {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
  // Get properties owned by user
  const { token } = req.cookies;
  let userData;
  try {
    userData = jwt.verify(token, jwtSecret);
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
  const {
    property,
    checkIn,
    checkOut,
    maxGuests: numberOfGuests,
    fullName,
    email,
    price,
  } = req.body;

  const newBooking = new Booking({
    property,
    checkIn,
    checkOut,
    numberOfGuests,
    fullName,
    email,
    price,
    user: userData.id,
  });

  newBooking
    .save()
    .then((saveBooking, err) => {
      if (err) throw err;
      res.json(saveBooking);
    })
    .catch((error) => {
      console.error("Error making booking:", error);
      res.status(500).json({
        message: "Error unable to make booking, please try again later",
      });
    });
});

app.get("/api/bookings", async (req, res) => {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);
  // Get properties owned by user
  const { token } = req.cookies;
  let userData;
  try {
    userData = jwt.verify(token, jwtSecret);
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ error: "Invalid token" });
  }

  res.json(await Booking.find({ user: userData.id }).populate("property"));
});

// Start the server
if (process.env.PORT) {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
} else {
  console.log("Server is running...");
}
