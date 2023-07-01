const mongoose = require("mongoose");
// Define the booking schema using mongoose.Schema
const bookingSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Property",
  },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  price: Number,
});
// Create a Mongoose model for the "Booking" collection
const BookingModel = mongoose.model("Booking", bookingSchema);
// Export the BookingModel to be used in other files
module.exports = BookingModel;
