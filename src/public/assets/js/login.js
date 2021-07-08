// $('#myModal').on('shown.bs.modal', function () {
//   $('#myInput').trigger('focus')
// })

var redir="";
document.getElementById("close1").onclick = function(e){
  if (redir != ""){
    location.href='index.html';
  }
}

$(function() {
  $('#login-form-link').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
   $("#register-form").fadeOut(100);
  $('#register-form-link').removeClass('active');
  $('#tab-register').removeClass('active');
  $(this).addClass('active');
  $('#tab-login').addClass('active');
  e.preventDefault();
});
$('#register-form-link').click(function(e) {
  $("#register-form").delay(100).fadeIn(100);
   $("#login-form").fadeOut(100);
  $('#login-form-link').removeClass('active');
  $('#tab-login').removeClass('active');
  $(this).addClass('active');
  $('#tab-register').addClass('active');
  e.preventDefault();
});
});

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

document.getElementById("login-submit").onclick = function(e){
  e.preventDefault();
  let username= document.getElementById("username-login").value;
  let password = document.getElementById("password-login").value;
  let title=""
  let error="";
  let success="";
  if(username, password == ""){
    title = "Empty fields";
    success="";
    if(username==""){
      error += '<p>Username field is empty</p>';
    }
    if(password==""){
      error += '<p>Password field is empty</p>';
    }
  }else{
   
      if($.post('/log-in',{username, password}) == true){
      title = "WELCOME BACK "+ username+"!!!";
      error="";
      success = "Successfully logged in, thanks for being our client!";
      // location.href="index.html";
      redir = success;
      
    }else{
      title = "Not valid User Name or Password";
      error += '<p>Wrong Password or User Name</p>';
    }  
    
    
  }
  

  $("#exampleModal").modal();
  $("#exampleModalLabel").empty();
  $("#modalSuccess").empty();
  $("#modalError").empty();
  $("#exampleModalLabel").append(title);
  $("#modalError").append(error);
  $("#modalSuccess").append(success);
  $("#exampleModal").modal();
}


document.getElementById("register-submit").onclick = function(e){
  e.preventDefault();
  let username= document.getElementById("username-reg").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email-reg").value;
  let password=document.getElementById("password-reg").value;
  let confirmPass= document.getElementById("confirm-password-reg").value;
  let form = document.getElementById("register-form");
  let title=""
  let error="";
  let success="";
  
  
  if(username , phone, email, password, confirmPass == ""){
    title="Empty Fields"
    success="";
    if(username == ""){
      error += '<p>Username field is empty</p>';
    }
    if(phone ==""){
      error += '<p>Phone nummber field is empty</p>';
    }
    if(email == ""){
      error += '<p>Email field is empty</p>';
    }
    if(password == "" || confirmPass == ""){
      error += '<p>Password or Confirm Password field is empty</p>';
    }
  }else{
    if(!validateEmail(email)){
      title="Not valid value";
      error += '<p>Enter a valid Email address</p>';
    }
    if(password != confirmPass){
      title = "Password does not match";
      error += '<p>Password and Confirm Password must have the same value</p>';
    }
    else{
      title = "WELCOME!!!";
      error="";
      success = "Your registration was succesfully sent, thanks for being our client!";
      redir = success;
      $.post( '/add-user', { username, phone, email, password} );
    }
  }
  
  $("#exampleModal").modal();
  $("#exampleModalLabel").empty();
  $("#modalSuccess").empty();
  $("#modalError").empty();
  $("#exampleModalLabel").append(title);
  $("#modalError").append(error);
  $("#modalSuccess").append(success);
  $("#exampleModal").modal();

  if(error==""){
    form.reset();
    return false;
  }
}

