/* function addItem(item){
  const itemHTML = 
      `<div class="testimonial-item" >
  <div>
    <h3 >${item.name}</h3>
    <br>
    <h4>${item.company}</h4>
    <p class="">${item.testimony}</p>
    
  </div>
</div>`
  const itemsContainer = document.getElementById("test");
  itemsContainer.innerHTML += itemHTML;
  
} */
var comments=[];
function addItem(item){
  //Comandos de inicialización del carrusel
  //Creamos un String para almacenar los íconos
  var rate="";
  //Bucle para agregar el Rating 1-5 estrellas rellenas
  for(let i=0;i<item.rating;i++){
    rate+="<i class='bx bxs-star'></i>"
  }
  //Bucle para agregar las estrellas vacías
  for(let i=0;i<5-item.rating;i++){
    rate+="<i class='bx bx-star'></i>"
  }
  //Aqui le añadimos al carrusel el testimonio en formato HTML
  $('#testimonio')
      .trigger('add.owl.carousel', [`<div class="testimonial-item" >
      <div>
        <h3 style="font-style: italic;">${item.name}</h3>
        <br>
        <h4>${item.company}</h4>
        
        <p class=""><i class="bx bxs-quote-alt-left quote-icon-left"></i>${item.testimony}<i class="bx bxs-quote-alt-right quote-icon-right"></i></p>
        
        <p>${rate}</p>
      </div>
    </div>`])
    //Finalmente refrescamos el carrusel
      .trigger('refresh.owl.carousel');
}
//Función agregar legado, actualmente no se utiliza
function agregar(){
  //Obtenemos los datos del form
  var nom, com, tes;
  nom = document.getElementById("name").value;
  com = document.getElementById("company").value;
  tes = $('textarea#testimonio').val();

  //alert(nom+"\n"+com+"\n"+tes);

  //Creamos un objeto para guardarlo en el Json
  var item={'name':nom,
  'company':com,
  'testimony':tes};
  addItem(item);
  comments.push(item);
  const testimonyJson = JSON.stringify(comments);
  window.localStorage.setItem('testimony', testimonyJson);  
}

function fetchTestimony() {
  fetch('assets/js/objetos.json')
      .then((response) => response.json()) // transforms data into json
      .then(response => {
        //Creamos un array al que le damos la información del Json
        let array=[];
        array=response.testimonios;
        console.log(array);
        //Hacemos un sort a los ratings del Json
        array.sort(function(a,b){
          return a.rating-b.rating;
        });
        //Hacemos un bucle de todas las respuestas mientras que no sean más de 10 y se ponen las más nuevas primero
        for (let i = array.length-1 ,j=0 ; (i >= 0)&&(j<15) ; i--, j++) {
            //comments.unshift(array.testimonios[i]);
            addItem(array[i]);
          }
/*            const testimonyJson = JSON.stringify(comments);
          window.localStorage.setItem('testimony', testimonyJson);  */
              
      })
}
let usuario=[];
function agregar_usuario(){

    //Obtenemos los datos del form
    var username, phone, email, password;
    username = document.getElementById("username-reg").value;
    phone = document.getElementById("phone").value;
    email = document.getElementById("email-reg").value;
    password = document.getElementById("password-reg").value;
  
    //alert(nom+"\n"+com+"\n"+tes);
  
    //Creamos un objeto para guardarlo en el Json
    var item={
    'user':username,
    'phone':phone,
    'email':email,
    'pass':password
    };
    if (window.localStorage.getItem('usuarios')) {
      const usuariosOld = localStorage.getItem('usuarios');
      const newUser = JSON.parse(usuariosOld);
      for (let i = 0; i < newUser.length; i++)
      usuario.push(newUser[i]);
      }
      usuario.push(item);

    // usuario.push(item);
    const userJson = JSON.stringify(usuario);
    window.localStorage.setItem('usuarios', userJson);  
    //location.href='index.html';
  }

  function login(username,password){
    const usuariosOld = localStorage.getItem('usuarios');
    const newUser = JSON.parse(usuariosOld);
    for (let i = 0; i < newUser.length; i++){
      if(username == newUser[i].user && password == newUser[i].pass){
        return true;
      }
    }
  }
/* function loadColorsFromStorage() {
  
  if (window.localStorage.getItem('testimony')) {
      const colorsJson = localStorage.getItem('testimony');
      const colors = JSON.parse(colorsJson);
      for (let i = 0; i < colors.length; i++) {
        addItem(colors[i]);
        comments.push(colors[i]);
      }
      
   const testimonyJson = JSON.stringify(comments);
  window.localStorage.setItem('testimony', testimonyJson);   
  }else{
    fetchTestimony();
  }
} */
function limpiar(){
  window.localStorage.clear();
}
fetchTestimony();
  //loadColorsFromStorage();
  const starRating = document.querySelector(".star-input");
