$('#btn-search').on('click',function(e){
  e.preventDefault();
  var search =$('#txt-search').val();
  
  url = "http://localhost:8080/data/"
  if(!isNaN(search)){
    url +="user/"+search;
    fetch(url)
      .then(response => response.json())
      .then(user => {
        $('#ID').val(user.idUsuarios);
        $('#username-reg').val(user.nombreUsuario);
        $('#phone').val(user.telefono);
        $('#email-reg').val(user.email);
        $('#password-reg').val(user.contrasena);
      })
      .catch(err=>console.log(err))
  }else{
    url +="find"
    fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'name': search
    })
    })
      .then(response => response.json())
      .then(user => {
        if(user[0] !== null){
          console.log(user[0])
        $('#ID').val(user[0].idUsuarios);
        $('#username-reg').val(user[0].nombreUsuario);
        $('#phone').val(user[0].telefono);
        $('#email-reg').val(user[0].email);
        $('#password-reg').val(user[0].contrasena);
        }
        
      })
      .catch(err=>console.log(err))
      
  }

});
$('#register-submit').on('click',function(e){
  e.preventDefault();

  var user =$('#username-reg').val();
  var phone =$('#phone').val();
  var email =$('#email-reg').val();
  var pass =$('#password-reg').val();
  url = "http://localhost:8080/data/register"
  fetch(url, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'name': user,
      'phone':phone,
      'email':email,
      'pass':pass
  })
  })
      .then(response =>{
        response.text()
        .then(function (text) {
          console.log(text)
        }
      )
    })
    .catch(err=>console.log(err))
  
});
$('#update-submit').on('click',function(e){
  e.preventDefault();
  var id = $('#ID').val();
  var user =$('#username-reg').val();
  var phone =$('#phone').val();
  var email =$('#email-reg').val();
  var pass =$('#password-reg').val();
  data ={
    "nombreUsuario": user,
    "telefono": phone,
    "email": email,
    "contrasena": pass
}
  url = "http://localhost:8080/data/update/"+id;
  fetch(url, {
    method: 'PUT', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(response =>{
      response.text()
      .then(function (text) {
        console.log(text)
      }
    )
  })
.catch(err=>console.log(err))
});
      

$('#delete-submit').on('click',function(e){
  e.preventDefault();
  url = "http://localhost:8080/data/delete/"
  var id = $('#ID').val();
  url += id;
  fetch(url, {
    method: 'DELETE', // or 'PUT'
    
  })
      .then(response =>{
        response.text()
        .then(function (text) {
          console.log(text)
        }
      )
    })
    .catch(err=>console.log(err))
});