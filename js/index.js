//import { client } from "./contentful";
//import "core-js/stable";
//import dados  from './receitas.js';

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "dcugw5hovzo7",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "yMCnTzi1YDlxhXNk48g9bBA6vYOLOrR0tcJCUKpwoXc"
});

client.sync({
  initial: true
});

const receitaDOM = document.querySelector('.receitaContainer');

class Receitas{
   async getReceitas() {
     try{
        //let resultado = await fetch('js/receitas.json');
        //let dados = await resultado.json();
        let dados = await client.getEntries({
          content_type: "receitaPost"
        });
        
        //let receitas = dados.receitas;
        let receitas = dados.items;
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
        result +=  `
           <div class="col-sm-6 col-md-4 col-lg-4 p-2 mb-0 ${receita.categoria}" >
                 <article>
                   <div class="card img-container">
                       <img src=${receita.image} class="card-img-top img-fluid" alt="receita-img" >
                       <button type="button" class="btn-ver-receita" data-id="${receita.id}" data-toggle="" data-target="">
                           Ver Receita <i class="fa fa-cutlery"></i>
                       </button>
                       <div class="card-body p-2">
                         <h5 class="card-title mt-1">${receita.nome}</h5>
                       </div>
                   </div>
                 </article>
           </div>
        `;
        
      });
      receitaDOM.innerHTML = result;
   }
}



document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const receitasList = new Receitas();
  receitasList.getReceitas()
                .then(receitas =>{
                    ui.displayReceitas(receitas);
                 });
});
