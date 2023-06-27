const mongoose = require("mongoose");

// Define the property schema
const propertySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: Object,
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  maxGuests: Number,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the property model
const PropertyModel = mongoose.model("Property", propertySchema);

module.exports = PropertyModel;
