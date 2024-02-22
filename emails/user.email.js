const nodemailer = require("nodemailer");

module.exports.sendEmail = async (options) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yassooff2004@gmail.com",
        pass: "aaxs olqg bqpr npsu",
      },
    });

    await transporter.sendMail({
      from: '"Test" <yassooff2004@gmail.com>',
      to: options.email,
      subject: "Hello ✔",
      text: "",
      html: `
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Template</title>
          <style>
              
              body, html {
                  margin: 0;
                  padding: 0;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.5;
              }
              
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ccc;
                  border-radius: 8px;
              }
             
              h1 {
                  color: #333;
                  text-align: center;
              }
              
              .message {
                  margin-top: 20px;
                  padding: 20px;
                  background-color: #f9f9f9;
                  border-radius: 8px;
              }
             
              .btn {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #007bff;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 5px;
              }
             
              .footer {
                  margin-top: 20px;
                  text-align: center;
                  color: #777;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Welcome to Our Website</h1>
              <div class="message">
                  <p>Hello there,</p>
                  <p>We are excited to have you on board! Please click the button below to verify your email address.</p>
                  <a href="http://localhost:3000/users/verify/${options.token}" class="btn">Verify Email</a>
              </div>
              <div class="footer">
              </div>
          </div>
      </body>
      </html>
      `,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
