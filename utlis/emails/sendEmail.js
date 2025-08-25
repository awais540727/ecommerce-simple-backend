import nodemailer from "nodemailer";

export const sendEmail = (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "awaisaliarshad54@gmail.com",
      pass: "ngns jake dien molv",
    },
  });

  const mailOptions = {
    from: "awaisaliarshad54@gmail.com",
    to: "awaisali35102@gmail.com",
    subject: "Test SignUp",
    text: "SignUp Successfully",
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // console.log("Error sending email:", error);
        return res.status(500).json({ message: error.message });
      }
      if (info.messageId) {
        // console.log((messageID = info.messageId));
        return res.status(200).json({
          message: "Email Sent Successfully",
          messageId: info.messageId,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};
