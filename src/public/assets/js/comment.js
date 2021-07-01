var commentList = [];
const fs = require('fs');
function addComment(name, company, testimonio){
  const fecha = new Date();
  var newComment ={
    name : name,
    company : company,
    testimonio : testimonio,
    fecha : fecha
  }
  

}
// INICIA SECCION PARA AGREGAR COMENTARIOS
function addItem(item){
  const itemHTML = '<div class="card" style="width: 44rem;">\n' +
      '    <div class="card-body">\n' +
      '        <h5 class="card-title">'+item.name+'</h5>\n' +
          '<h6 class="card-title">'+item.company+'</h6>\n' +
      '        <p class="card-text">'+item.testimony+'</p>\n' +
      '       ' +
      '    </div>\n' +
      '</div>\n' +
      '<br/>';
  const itemsContainer = document.getElementById("list-items");
  itemsContainer.innerHTML += itemHTML;
}
function agregar(){
  var nom, com, tes;
  nom = document.getElementById("name").value;
  com = document.getElementById("company").value;
  tes = document.getElementById("testimonio").value;
  // alert(nom+"\n"+com+"\n"+tes);
  var item={'name':nom,
  'company':com,
  'testimony':tes};
  addItem(item);
}
addItem({'name':'juice',
  'company':'Fuisbook',
  'testimony':'Orange and Apple juice fresh and delicious'});

addItem({'name':'Tayto',
  'company':'Generation',
  'testimony':'Cheese & Onion Chips'})