import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
export const sendEmail2 = (req, res) => {
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
    subject: "Test Email",
    template: "email",
    context: {
      name: "Aw",
      phone: "03393982727",
    },
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      // console.log(error, info);
      if (error) {
        return res.status(404).json({ error: error.message });
      }
      if (info.messageId) {
        return res.status(200).json({
          message: "Email sent successfully",
          messageId: info.messageId,
        });
      }
    });
  } catch (error) {
    res.status(404).json("Someting went wrong");
  }
};
