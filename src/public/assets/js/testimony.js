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
  
}

function fetchTestimony() {
  fetch('assets/js/objetos.json')
      .then((response) => response.json()) // transforms data into json
      .then(response => {
          for (let i = 0; i < response.testimonios.length; i++) {
            addItem(response.testimonios[i]);
          }

/*              const testimonyJson = JSON.stringify(response.data);
          localStorage.setItem('testimony', testimonyJson);  */
      })
}

fetchTestimony();
/* var payload = {'name':"Rogelio",
'company':" ",
'testimony':"Esta es una prueba de Json"
};

var data = new FormData();
data.append( "json", JSON.stringify( payload ) );

fetch("assets/js/objetos.json",
{
  method: "POST",
  body: data
})
.then(function(res){ return res.json(); })
.then(function(data){ alert( JSON.stringify( data ) ) })
fetchTestimony(); */
