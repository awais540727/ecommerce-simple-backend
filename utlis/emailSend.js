import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
export const sendMail1 = (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "awaisaliarshad54@gmail.com",
      pass: "ngns jake dien molv",
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
  const mailOptions = {
    from: "awaisaliarshad54@gmail.com",
    to: "fiver378@gmail.com",
    subject: "Test case",
    template: "email",
    context: {
      name: "Awais Ali",
      phone: "03055798339",
    },
  };

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error, message: error.message });
      }
      if (info.messageId) {
        // console.log(info.messageId);
        return res.status(200).json({
          message: "Email Sent Succcefully",
          messageId: info.messageId,
        });
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
