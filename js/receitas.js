// Receita 
class Receita {
    constructor(nome, categoria, imageUrl, descricao){
        this.nome = nome;
        this.categoria = categoria;
        this.imageUrl = imageUrl;
        this.descricao = descricao;
    }
}

// UI
class UI{
    adicionarReceita(receita){
        const receitaList = document.getElementById('receita-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="col-sm-12 col-md-4 col-lg-4">
                <div class="card mb-3 ${receita.categoria}">
                    <img src="${receita.imageUrl}" class="card-img-top img-fluid" alt="receita-img" >
                    <div class="card-body">
                        <h6 class="card-title">${receita.nome}</h6>
                        <p class="card-text">${receita.descricao}</p>
                        <a href="#" class="btn btn-primary btn-block">Ver Receita <i class="fa fa-cutlery" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        `;
        receitaList.appendChild(element);
    }
}