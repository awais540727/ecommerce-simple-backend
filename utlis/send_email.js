import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fiver#78@gmail.com",
    pass: "sjshbdshbshdbhjds",
  },
});

const sendEmail = (req, res) => {
  mailOptions = {
    from: "fiver378@gmail.com",
    to: "fiver378@gmail.com",
    subject: "Test Email",
    text: "Hello Test",
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
