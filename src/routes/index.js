const { Router } = require('express');
const nodemailer = require('nodemailer');
const router = Router();

router.post('/send-email', async (req, res) => {

    const {name, email, subject, message} = req.body;
    contentHTML = `
    <h1>User Information</h1>
    <ul>
        <li>Username: ${name}</li>
        <li>User Email: ${email}</li>
        <li>Asunto: ${subject}</li>
    </ul>
    <p>${message}</p>
`;

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: 'ericjesus.aguirre@gmail.com',
      pass: 'zhzdqepaivfbptbk'
  },
  tls: {
      rejectUnauthorized: false
  }
});
let info = await transporter.sendMail({
  from: '"Webcode Server" <ericjesus.aguirre@gmail.com>', // sender address,
  to: 'ericjam3@gmail.com',
  subject: 'Website Contact Form',
  // text: 'Hello World'
  html: contentHTML
});
console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.redirect('/index.html');
});


module.exports = router;