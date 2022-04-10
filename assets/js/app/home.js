firebase.auth().signOut();




const verProduto =  (event)=> {
    event.preventDefault();
    //const articleProduto = (event.target).parentNode.parentNode.removeChild((event.target).parentNode);
    const articleProduto = event.target.parentNode;
    const id = articleProduto.children[4].innerText;
    const categoria = articleProduto.children[5].innerText;
    window.location= `ver-produto.html?id=${id}&categoria=${categoria}`;
}


const InputArticleStarWars = (stringArticle,stringArticleDesktop,countStarwars) => 
{
 if(countStarwars<4){
     console.log('Cheguei aqui');
    sectionStarWars.innerHTML += stringArticle;
    return
 }
 if(countStarwars<6) sectionStarWars.innerHTML += stringArticleDesktop;
}

const InputArticleConsole = (stringArticle,stringArticleDesktop,countConsoles) => 
{
if(countConsoles<4){
    console.log('Cheguei aqui');
    sectionConsole.innerHTML += stringArticle;
    return
} 
if(countConsoles<6) sectionConsole.innerHTML += stringArticleDesktop;
}

const InputArticleDiversos = (stringArticle,stringArticleDesktop,countDiversos) => 
{
if(countDiversos<4){
    sectionDiversos.innerHTML += stringArticle;
    return
} 
if(countDiversos<6) sectionDiversos.innerHTML += stringArticleDesktop;
}



const atualizaDados = async (snapshoot) =>
{   
    let countStarwars = 0;
    let countConsoles = 0;
    let countDiversos = 0;

    snapshoot.forEach(element => 
    {

        const idProduto = element.val().id;
        const nomeProduto = element.val().nome;
        const precoProduto = element.val().preco;
        const descricaoProduto = element.val().descricao;
        const categoriaProduto = element.val().categoria;
        const urlImagem = element.val().url_imagem;

        const stringArticle = 
        `<article class="cards__produto">
        <img src=${urlImagem} alt=${descricaoProduto} class="cards__produto--imagem">
        <h3 class="cards__produto--titulo">${nomeProduto}</h3>
        <p class="cards__produto--preco">${precoProduto}</p>
        <a href="" class="cards__produto--link" data-ver-produto>Ver produto</a>
        <p class="cards__produto--id" style="display: none;">${idProduto}</p>
        <p class="cards__produto--categoria" style="display: none;">${categoriaProduto}</p>
        </article>`;

        const stringArticleDesktop =
        `<article class="cards__produto cards__produto--desktop">
        <img src=${urlImagem} alt=${descricaoProduto} class="cards__produto--imagem">
        <h3 class="cards__produto--titulo">${nomeProduto}</h3>
        <p class="cards__produto--preco">${precoProduto}</p>
        <a href="" class="cards__produto--link" data-ver-produto>Ver produto</a>
        <p class="cards__produto--id" style="display: none;">${idProduto}</p>
        <p class="cards__produto--categoria" style="display: none;">${categoriaProduto}</p>
        </article>`;

        switch  (categoriaProduto){
            case 'star-wars':
                InputArticleStarWars(stringArticle,stringArticleDesktop,countStarwars);
                countStarwars++;
                break;
            case 'consoles':
                InputArticleConsole(stringArticle,stringArticleDesktop,countConsoles);
                countConsoles++;
                break;
            case 'diversos':
                InputArticleDiversos(stringArticle,stringArticleDesktop,countDiversos);
                countDiversos++;
                break;
            default:
                InputArticleDiversos(stringArticle,stringArticleDesktop,countDiversos);
        }
        
    })

}




const sectionStarWars = document.querySelector('[data-star-wars]');
const sectionConsole = document.querySelector('[data-console]');
const sectionDiversos = document.querySelector('[data-diversos]');

const linkVerTudo = document.querySelectorAll('[data-ver-tudo]');
linkVerTudo.forEach(element=>{
    element.addEventListener('click',(e) =>{
        e.preventDefault();
        window.location.href = 'ver-tudo.html';
    }
    )
})

const database = firebase.database();
const dbRef =  database.ref('Produto');

dbRef.on('value',(snapshoot)=>{

    atualizaDados(snapshoot)
    .then(()=>{

        const linkVerProduto = document.querySelectorAll('[data-ver-produto]');
        
        linkVerProduto.forEach(element => {
            element.addEventListener('click',verProduto);
        })

    })
})