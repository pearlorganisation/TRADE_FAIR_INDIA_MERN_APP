// ----------------------------------------------imports------------------------------------------------
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
// -----------------------------------------------------------------------------------------------------

// sendMail - this method is used to send mail
exports.sendMail = async (email, otp) => {
  // transporter - configuration of admin/user to send mail from
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_MAIL,
      pass: process.env.NODEMAILER_MAIL_PASSWORD,
    },
  });
  const templatePath = path.join(__dirname, `../../views/forgotPassword.ejs`);

  let data = await ejs.renderFile(templatePath, { email, otp });

  //   mailOptions - details of the user to whom the mail needs to be delievered
  mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    to: email,
    subject: "Trade Fair India Otp",
    html: data,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      } else {
        return resolve("Otp Sent Successfully" + info.response);
      }
    });
  });
};
