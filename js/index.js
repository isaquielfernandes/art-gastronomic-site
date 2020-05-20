import data from "./receita";

const receitaDOM = document.querySelector(".receitaContainer");

class Receitas {
   async getReceitas() {
     try{
        let receitas = data.items;
        receitas = receitas.map( item => {
           const {nome, categoria, descricao} = item.fields;
           const id = item.sys;
           const image = item.fields.image.fields.file.url;
           return {nome, categoria, descricao, id, image};
        });
        console.log(receitas);
        return receitas;
     }catch(er){
       console.log(er);
   }
}

class UI{
   displayReceitas(receitas){
     let result = "";
     receitas.forEach(receita => {
       result += `
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 ${receita.categoria}" data-fluidbox>
                 <div class="card mb-3">
                      <img src=${receita.image} class="card-img-top img-fluid" alt="receita-img" >
                      <div class="card-body p-1">
                        <h5 class="card-title mt-1">${receita.nome}</h5>
                        <p class="card-text text-truncate">${receita.descricao}</p>
                        <a href="#" class="btn btn-primary btn-block" data-id=${receita.id}>Ver Receita <i class="fa fa-cutlery" aria-hidden="true"></i></a>
                      </div>
                 </div>
          </div>
       `;
     });
     receitaDOM.innerHTML = result;
   }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const receitas = new Receitas();

  // mostrar todas as receitas
  receitas.getReceitas()
    .then(receitas => {
      ui.displayReceitas(receitas);
    });
});
