require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  pool: true,
  service: "Gmail",
  auth: {
    type: "OAuth2",
    user: process.env.gmailUser,
    refreshToken: process.env.refresh_token,
    clientId: process.env.client_id,
    clientSecret: process.env.client_secret,
  },
});

transporter.verify((error, success) => {
  if (error) return console.log(error);
  console.log("Server is ready to take our messages: ", success);
  transporter.on("token", (token) => {
    console.log("A new access token was generated");
    console.log("User: %s", token.user);
    console.log("Access Token: %s", token.accessToken);
    console.log("Expires: %s", new Date(token.expires));
  });
});

module.exports = transporter;
