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
  console.log("Register")
});
$('#update-submit').on('click',function(e){
  console.log("Register")
});
$('#delete-submit').on('click',function(e){
  console.log("Register")
});