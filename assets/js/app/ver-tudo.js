firebase.auth().signOut();



const verProduto =  (event)=> {
    event.preventDefault();
    //const articleProduto = (event.target).parentNode.parentNode.removeChild((event.target).parentNode);
    const articleProduto = event.target.parentNode;
    const id = articleProduto.children[4].innerText;
    const categoria = articleProduto.children[5].innerText;
    window.location= `ver-produto.html?id=${id}&categoria=${categoria}`;
}





const atualizaDados =  (snapshoot) =>{
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
        <p class="cards__produto--preco">R$ ${precoProduto}</p>
        <a href="" class="cards__produto--link" data-ver-produto>Ver produto</a>
        <p class="cards__produto--id" style="display: none;">${idProduto}</p>
        <p class="cards__produto--categoria" style="display: none;">${categoriaProduto}</p>
        </article>`;
    });
    const linkVerProduto = document.querySelectorAll('[data-ver-produto]');
        
        linkVerProduto.forEach(element => {
            element.addEventListener('click',verProduto);
        })
    
    carregaImagem.classList.toggle('none');
    aguardeMsg.classList.toggle('animation__frase');
    aguardeMsg.classList.toggle('none'); 
    mainData.classList.toggle('none');
    titulo.classList.toggle('none');
   
  
    
}
const sectionCards = document.querySelector('[data-cards]');

const carregaImagem = document.querySelector('[data-img-animation]');
const aguardeMsg = document.querySelector('[ data-animation-frase]');
const mainData = document.querySelector('[data-main]');
const titulo = document.querySelector('[data-titulo]');



const database = firebase.database();
const dbRef =  database.ref('Produto');
dbRef.on('value',(snapshoot)=>{
    atualizaDados(snapshoot)
})

