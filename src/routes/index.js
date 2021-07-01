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
const fs = require('fs');
var datos = { testimonios:[]};
// <-------------------------------------------------

fs.readFile('src/public/assets/js/objetos.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    datos = JSON.parse(data);
}});


// <-------------------------------------------------
router.post('/add-comment', async (req, res) => {
  
    
    // const datos = { table:[]};
    const myJSON = {name, company, testimony} = req.body;
    let newData ={
        name,
        company,
        testimony
    }

    datos.testimonios.push(newData);
    const data = JSON.stringify(datos);

   
    fs.writeFile('src/public/assets/js/objetos.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
//    console.log(data);
//    res.send('received');
    res.redirect('/testimonios.html');
});


module.exports = router;