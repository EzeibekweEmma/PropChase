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

function sendNewPasswordEmail(email, userName, newPassword) {
  // Function to send a new password via email

  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE_PROVIDER, // e.g., Gmail, Outlook
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  
  // Html email template for a password reset email
  const emailMessage = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset</title>
    <style>
      * {
        font-family: "Trebuchet MS", sans-serif;
        margin: 0;
        padding: 0;
        color: #001a33;
      }
      header {
        padding: 10px 0;
        text-align: center;
        background-color: #cbd5e1;
        font-size: x-large;
      }
      header > img {
        height: 35px;
        width: 35px;
        margin-bottom: -6px;
      }
      main {
        margin: 20px;
      }
      main h2 {
        margin-bottom: 20px;
      }
      main p {
        margin-bottom: 5px;
        font-size: 18px;
      }
      code {
        background-color: #cbd5e1;
        padding: 4px 6px;
        border-radius: 5px;
        letter-spacing: 1px;
        font-weight: 600;
        font-size: 14px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }
    </style>
  </head>
  <body>
    <header>
      <img
        src="https://prop-chase.s3.amazonaws.com/PropChase-1688792625261.png"
      />
      <span>PropChase</span>
    </header>
    <main>
      <h2><br />Dear, ${userName}</h2>
      <p><br />The request to reset your password was successfully.</p>
      <p>
        <br />
        <span>Here is your new password:</span>
        <code>${newPassword}</code>
      </p>
      <p>
        <br />
        <b>Note:</b>
        Consider changing the new password after logging in.
      </p>
      <p><br />Best regards,<br />PropChase</p>
    </main>
  </body>
</html>
`;
  // Configure the email content
  const mailOptions = {
    from: "PropChase <no_reply@propchase.com>",
    to: email,
    subject: "Password Reset",
    html: emailMessage,
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
