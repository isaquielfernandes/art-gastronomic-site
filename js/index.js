//import { client } from "./contentful";
//import "core-js/stable";

items = [
  {
    sys: { id: "1" },
    fields: {
      nome: "receita 01",
      categoria: "vegan",
      descricao: "",
      image: { fields: { file: { url: "img/receita/receita-1.jpg" } } }
    }
  },
  {
    sys: { id: "2" },
    fields: {
      nome: "receita 02",
      categoria: "peixes",
      descricao: "",
      image: { fields: { file: { url: "img/receita/receita-2.jpg" } } }
    }
  },
  {
    sys: { id: "3" },
    fields: {
      nome: "receita 03",
      categoria: "arroz",
      descricao: "",
      image: { fields: { file: { url: "img/receita/receita-3.jpg" } } }
    }
  },
  {
    sys: { id: "4" },
    fields: {
      nome: "receita 04",
      categoria: "paes",
      descricao: "",
      image: { fields: { file: { url: "img/receita/receita-4.jpg" } } }
    }
  },
  {
    sys: { id: "5" },
    fields: {
      nome: "receita 05",
      categoria: "paes",
      descricao: "",
      image: { fields: { file: { url: "img/receita/receita-5.jpg" } } }
    }
  },
  {
    sys: { id: "6" },
    fields: {
      nome: "receita 06",
      categoria: "vegan",
      descricao: "",
      image: { fields: { file: { url: "img/receita/receita-6.jpg" } } }
    }
  },
  {
    sys: { id: "7" },
    fields: {
      nome: "receita 07",
      categoria: "paes",
      descricao: "",
      image: { fields: { file: { url: "img/receita/receita-7.jpg" } } }
    }
  },
  {
    sys: { id: "8" },
    fields: {
      nome: "receita 08",
      categoria: "paes",
      descricao: "",
      image: { fields: { file: { url: "img/receita/receita-8.jpg" } } }
    }
  }
]

const receitaDOM = document.querySelector('.receitaContainer');

class Receitas{
   async getReceitas() {
     try{
       // let resultado = await fetch('receitas.json');
      //  let dados = resultado.json();
        //let dados = await client.getEntries({
        //    content_type: " "
        //});
        
        let receitas = items;
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
