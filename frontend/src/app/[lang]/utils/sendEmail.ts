const nodemailer = require("nodemailer");

type DataType = {
  email: string;
  name?: string;
};

const sendEmail = async (data: DataType) => {
  const {
    email: fromEmail,
    name,
  } = data;
  const userEmail = process.env.USER_EMAIL;
  const passwordEmail = process.env.PASSWORD_EMAIL;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp-relay.gmail.com",
    auth: {
      user: userEmail,
      pass: passwordEmail,
    },
  });

  const msg = {
    from: fromEmail,
    to: userEmail,
    subject: "MettaShipping: You have a new message.",
    text: `
     ${name} have sent you a testimonial
    `,
  };

  try {
    return await transporter.sendMail(msg);
  } catch (err) {
    console.log("err:", err);
    throw err;
  }
};

export default sendEmail;
