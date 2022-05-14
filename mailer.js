const nodemailer = require("nodemailer");
const config = require("./config");

module.exports = {
  setUpAccount: function (mesg, subject, fromAccount, toAccount) {
    let mailOptions = {
      from: fromAccount, // sender address
      to: toAccount, // list of receivers
      subject: subject, // Subject line
      html: mesg, // html body
    };

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.user, // generated ethereal user
        pass: config.pass, // generated ethereal password
      },
    });

    transporter.verify((error, success) => {
      if (error) console.error(error);
      console.log("Your config is correct");
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      if (info.messageId == "" || info.messageId == undefined) {
        return console.log("Mailer error");
      } else {
        console.log("Message sent");
      }
    });
  },
};
