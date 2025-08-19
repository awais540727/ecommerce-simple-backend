import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fiver#78@gmail.com",
    pass: "sjshbdshbshdbhjds",
  },
});
const options = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};
transporter.use("compile", hbs(options));
const sendEmail = (req, res) => {
  mailOptions = {
    from: "fiver378@gmail.com",
    to: "fiver378@gmail.com",
    subject: "Test Email",
    html: "email",
    context: {
      name: "Aw",
      nuumber: "03393982727",
    },
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      console.log(error, info);
      res.status(200).json(info.messageId);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
