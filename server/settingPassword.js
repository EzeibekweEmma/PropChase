const nodemailer = require("nodemailer");

function generateRandomPassword() {
  // Function to generate a random password
  const length = 10; // Length of the generated password
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
}

function sendNewPasswordEmail(email, newPassword) {
  // Function to send a new password via email
  
  const transporter = nodemailer.createTransport({
    service: "your_email_service_provider", // e.g., Gmail, Outlook
    auth: {
      user: "your_email@example.com",
      pass: "your_email_password",
    },
  });

  // Configure the email content
  const mailOptions = {
    from: "your_email@example.com",
    to: email,
    subject: "Password Reset",
    text: `Your new password is: ${newPassword}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = {
  sendNewPasswordEmail,
  generateRandomPassword,
};
