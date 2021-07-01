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
  $('#testimonio')
      .trigger('add.owl.carousel', [`<div class="testimonial-item" >
      <div>
        <h3 style="font-style: italic;">${item.name}</h3>
        <br>
        <h4>${item.company}</h4>
        
        <p class=""><i class="bx bxs-quote-alt-left quote-icon-left"></i>${item.testimony}<i class="bx bxs-quote-alt-right quote-icon-right"></i></p>
        
        
      </div>
    </div>`])
      .trigger('refresh.owl.carousel');
}

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
          for (let i = 0; i < response.testimonios.length; i++) {
            comments.push(response.testimonios[i]);
            addItem(response.testimonios[i]);
          }
           const testimonyJson = JSON.stringify(comments);
          window.localStorage.setItem('testimony', testimonyJson); 
              
      })
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



