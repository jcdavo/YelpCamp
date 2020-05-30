require("dotenv").config();
const nodemailer = require("nodemailer");

// google API
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.client_id, // ClientID
  process.env.client_secret, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token: process.env.refresh_token,
});
const accessToken = oauth2Client.getAccessToken();

const transport = {
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.gmailUser,
    clientID: process.env.client_id,
    clientSecret: process.env.client_secret,
    refreshToken: process.env.refresh_token,
    accessToken: process.env.access_token,
  },
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((err, success) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Ready to send mail: ${success}`);
  }
});

module.exports = transporter;
