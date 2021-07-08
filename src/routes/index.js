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
  //a donde llegan los correos
  to: 'wcodecompany@gmail.com',
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
    const myJSON = {name, company, testimony, rating} = req.body;
    let newData ={
        name,
        company,
        testimony,
        rating
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
    res.redirect('/testimony.html');
});

    const mysql = require('mysql');
const { callbackPromise } = require('nodemailer/lib/shared');

   

router.post('/add-user', async (req, res) => {
  
    
   
    const myJSON = {username, phone, email, password} = req.body;


    // // ----------------------------------------------------------------------------
    const connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'admin',
        database:'wcode'
      });
      connection.connect((err)=>{
        if(err) throw err
        console.log('la conexion funciona')
      })
    
    //   var username, phone, email, password;
     
    //       username = document.getElementById("username-reg").value;
    //       phone = document.getElementById("phone").value;
    //       email = document.getElementById("email-reg").value;
    //       password = document.getElementById("password-reg").value;
    
     
        const insert = `INSERT INTO usuarios (idUsuarios,nombreUsuario,telefono,email,contrasena) VALUES (null,'${username}','${phone}','${email}','${password}')`
      connection.query(insert, (err, rows) => {
        if(err) throw err
      })
  
      connection.end()
});
router.post('/log-in', async (req, res) => {

    const myUser = {username, password} = req.body;
    
    // //----------------------------------------------------------------------------
    const connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'admin',
        database:'wcode'
      
      });
      connection.connect((err)=>{
        if(err) throw err
        console.log('la conexion funciona')
      })

      connection.query('SELECT * from usuarios', (err,rows) =>{
        if(err) throw err
        //console.log(username,password)
        for(let i=0;i<rows.length;i++){
        //console.log(rows[i].nombreUsuario,rows[i].contrasena)
          if(rows[i].nombreUsuario==username&&rows[i].contrasena==password){
            
              console.log("You have logged in succesfully")
              res.send(true)
            break;
          }else if(i+1==rows.length){
            console.log("Incorrect password or username")
            res.send(false)
          }
        }
        })
        
      connection.end()
});

module.exports = router;