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
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
          <div style="text-align: center; background-color: #333333; color: #ffffff; padding: 20px; border-radius: 8px;">
            <img src="cid:logo" alt="Logo" style="max-width: 150px; margin-bottom: 10px;">
            <h1 style="color: #ffffff;">Welcome to Our Website</h1>
            <p style="color: #f4f4f4;">Hello ${userName},</p>
            <p style="color: #f4f4f4;">Thank you for joining our website! Here is your password for logging in:</p>
            <p style="color: #ffffff;"><strong>${password}</strong></p>
            <p style="color: #f4f4f4;">Best regards,<br>The Team</p>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: "logo.png", // Name of the file to display in the email
          path: "./src/fileStorage/logo.png", // Adjust this path to match your file structure
          cid: "logo", // Content ID for embedding the image
        },
      ],
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


const sendMailForVoting = async (allUsers, _id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: "vignesh4974@gmail.com",
        pass: "dxep fkvw kjgu ezsh", // Use an app password for security
      },
      tls: {
        rejectUnauthorized: false, // Bypasses certificate validation
      },
    });

    for (const user of allUsers) {
      const { email, userName } = user;
      const votingLink = `http://localhost:5173/voting/${_id}`;

      const mailOptions = {
        from: "vignesh4974@gmail.com",
        to: email,
        subject: "Cast Your Vote",
        html: `
          <!DOCTYPE html>
          <html>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
            <div style="text-align: center; background-color: #333333; color: #ffffff; padding: 20px; border-radius: 8px;">
              <img src="cid:logo" alt="Logo" style="max-width: 150px; margin-bottom: 20px;"/>
              <h1 style="color: #ffffff;">Hello, ${userName}</h1>
              <p style="color: #f4f4f4;">We invite you to participate in the voting process. Please click the button below to cast your vote.</p>
              <a href="${votingLink}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #ff7f50; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 5px;">Vote</a>
              <p style="color: #f4f4f4; margin-top: 20px;">Best regards,<br>The Voting Team</p>
            </div>
          </body>
          </html>
        `,
        attachments: [
          {
            filename: "logo.png",
            path: "./src/fileStorage/logo.png", // Adjust this path to your logo file
            cid: "logo", // Content ID for embedding the image
          },
        ],
      };

      await transporter.sendMail(mailOptions);
      console.log(`Mail sent to ${email}`);
    }
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
  }
};











module.exports = { sendMailToUser,sendMailForVoting };
