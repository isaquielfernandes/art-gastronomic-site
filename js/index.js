//import { client } from "./contentful";
//import "core-js/stable";

//import dados  from './receitas.js';

const receitaDOM = document.querySelector('.receitaContainer');

class Receitas{
   async getReceitas() {
     try{
      let resultado = await fetch('js/receitas.json');
      let dados = await resultado.json();
        //let dados = await client.getEntries({
        //    content_type: " "
        //});
        
        let receitas = dados.receitas;
        receitas = receitas.map( item => {
           const { nome, categoria, descricao } = item.fields;
           const { id } = item.sys;
           const image = item.fields.image.fields.file.url;
           return {nome, categoria, descricao, id, image};
        });
        return receitas;
     }catch(er){
       console.log(er);
   }
 }
}

class UI{
   displayReceitas(receitas){
     let result = "";
     receitas.forEach(receita => {
       result += `
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 ${receita.categoria}" data-fluidbox>
              <article>
                  <div class="card mb-3 img-container">
                      <img src="${receita.image}" class="card-img-top img-fluid" alt="receita-img" >
                      <button type="button" class="btn-ver-receita"data-id="${receita.id}" data-toggle="modal" data-target="">
                          Ver Receita <i class="fa fa-cutlery" aria-hidden="true"></i>
                      </button>
                      <div class="card-body p-2">
                        <h5 class="card-title mt-1">${receita.nome}</h5>
                      </div>
                  </div>
              </article>
          </div> <!-- article receita end-->
       `;
     });
     receitaDOM.innerHTML = result;
   }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const receitas = new Receitas();
  receitas.getReceitas()
              .then(receitas => {
                ui.displayReceitas(receitas);
              });
});
