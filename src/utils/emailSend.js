const nodemailer = require("nodemailer");

const sendMailToUser = async (email, password, userName) => {
  try {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
      auth: {
        user: "vignesh4974@gmail.com",
        pass: "dxep fkvw kjgu ezsh",
      },
      tls: {
        rejectUnauthorized: false, // This bypasses certificate validation
      },
    });

    const mailOptions = {
      from: "vignesh4974@gmail.com",
      to: email,
      subject: "Welcome to our website",
      text: `Hello ${userName}, This is your password for our site, ${password}.`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    console.log(`Mail sended to ${userName}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { sendMailToUser };
