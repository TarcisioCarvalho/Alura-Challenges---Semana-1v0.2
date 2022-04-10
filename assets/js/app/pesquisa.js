
const link = window.location.href;
const url = new URL(link);
const searchParams = new URLSearchParams(url.search); // For active browser link, use location.search
const nome = searchParams.get('nome'); 

const sectionCards = document.querySelector('[data-cards]');
const titulo = document.querySelector('[data-titulo]');

const database = firebase.database();
const dbRef =  database.ref('Produto');

if(!nome){
    titulo.innerText = 'Nada Encontrado';
}


const verProduto =  (event)=>{
    event.preventDefault();
    //const articleProduto = (event.target).parentNode.parentNode.removeChild((event.target).parentNode);
    const articleProduto = event.target.parentNode;
    console.log(articleProduto);
    const id = articleProduto.children[4].innerText;
   
    const categoria = articleProduto.children[5].innerText;
   
    window.location= `ver-produto.html?id=${id}&categoria=${categoria}`;
}

const filtra = (snapshoot) =>{

    console.warn = () => {};
   
    if(!snapshoot.val()){
        titulo.innerText = 'Nada Encontrado';
        return
    }

    snapshoot.forEach(element => {

        const idProduto = element.val().id;
        const nomeProduto = element.val().nome;
        const precoProduto = element.val().preco;
        const descricaoProduto = element.val().descricao;
        const categoriaProduto = element.val().categoria;
        const urlImagem = element.val().url_imagem;

        sectionCards.innerHTML += 
        `<article class="cards__produto">
        <img src=${urlImagem} alt=${descricaoProduto} class="cards__produto--imagem">
        <h3 class="cards__produto--titulo">${nomeProduto}</h3>
        <p class="cards__produto--preco">${precoProduto}</p>
        <a href="" class="cards__produto--link" data-ver-produto>Ver produto</a>
        <p class="cards__produto--id" style="display: none;">${idProduto}</p>
        <p class="cards__produto--categoria" style="display: none;">${categoriaProduto}</p>
        </article>`;
    });

        const linkVerProduto = document.querySelectorAll('[data-ver-produto]');
        
        linkVerProduto.forEach(element => {
            element.addEventListener('click',verProduto);
        })
   
}



    dbRef.orderByChild('nome').startAt(nome).endAt(nome + '\uf8ff').once('value')
    .then(filtra)
    .catch((e)=>{
    console.log('Erro');
})






