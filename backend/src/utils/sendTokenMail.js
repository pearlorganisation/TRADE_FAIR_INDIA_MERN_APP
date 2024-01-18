const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

// sendMail - this method is used to send mail
exports.sendTokenMail = async (email, url, name) => {
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

  const templatePath = path.join(__dirname, `../../views/verifyMail.ejs`);

  let data = await ejs.renderFile(templatePath, { url, name });

  mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    to: email,
    subject: "TRADE_FAIR_INDIA - EMAIL VERIFICATION",
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
