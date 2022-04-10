

const link = window.location.href;
const url = new URL(link);
const searchParams = new URLSearchParams(url.search); // For active browser link, use location.search
const id = searchParams.get('id'); 
const categoria = searchParams.get('categoria'); 


    const verProduto =  (event)=> {
        event.preventDefault();
       
        //const articleProduto = (event.target).parentNode.parentNode.removeChild((event.target).parentNode);
        const articleProduto = event.target.parentNode;
        const id = articleProduto.children[4].innerText;
       
        const categoria = articleProduto.children[5].innerText;
        
        window.location= `ver-produto.html?id=${id}&categoria=${categoria}`;
    }
    
   
    
   const insertArticle = (sectionCards,article,articleDesktop,countArticles) =>{
        if(countArticles<4){
            sectionCards.innerHTML+=article;
            return
        }
        if(countArticles<6) sectionCards.innerHTML+= articleDesktop;
   }
    

const atualizaDados = async (snapshoot) =>{

   let countArticles = 0;
    
    console.log(snapshoot.val());
    snapshoot.forEach(element => {

        const idProduto = element.val().id;
        console.log(idProduto,id);
        const nomeProduto = element.val().nome;
        const precoProduto = element.val().preco;
        const descricaoProduto = element.val().descricao;
        const categoriaProduto = element.val().categoria;
        const urlImagem = element.val().url_imagem;

        if(idProduto == id){
            console.log('entrei aqui');
            const sectionCard = document.createElement('section');
            console.log(sectionCard);
            sectionCard.innerHTML = `<article class="card__produto">
            <img src=${urlImagem} alt="" class="card__produto--imagem">
            <div class="card__produto--dados">
                <h2 class="card__produto--titulo">${nomeProduto}</h2>
                <p class="card__produto--preco">${precoProduto}</p>
                <p class="card__produto--descricao">${descricaoProduto}!</p>
                <p class="cards__produto--id" style="display: none;">${idProduto}</p>
                <p class="cards__produto--categoria" style="display: none;">${categoriaProduto}</p>
            </div>
        </article>`
            console.log(sectionCards);
            const body = sectionCards.parentNode
            console.log(body);
            body.insertBefore(sectionCard,titulo);
        }else{
            if((categoriaProduto == categoria))
            {

                const article = `<article class="cards__produto">
                <img src=${urlImagem} alt="" class="cards__produto--imagem">
                <h3 class="cards__produto--titulo">${nomeProduto}</h3>
                <p class="cards__produto--preco">${precoProduto}</p>
                <a href="" class="cards__produto--link" data-ver-produto>Ver produto</a>
                <p class="cards__produto--id" style="display: none;">${idProduto}</p>
                <p class="cards__produto--categoria" style="display: none;">${categoriaProduto}</p>
                </article>`;

                const articleDesktop = `<article class="cards__produto cards__produto--desktop">
                <img src=${urlImagem} alt="" class="cards__produto--imagem">
                <h3 class="cards__produto--titulo">${nomeProduto}</h3>
                <p class="cards__produto--preco">${precoProduto}</p>
                <a href="" class="cards__produto--link" data-ver-produto>Ver produto</a>
                <p class="cards__produto--id" style="display: none;">${idProduto}</p>
                <p class="cards__produto--categoria" style="display: none;">${categoriaProduto}</p>
                </article>`;

                insertArticle(sectionCards,article,articleDesktop,countArticles);
                countArticles++
         
            
            
            }
        }
    });
}
const titulo = document.querySelector('[data-titulo]');
const sectionCards = document.querySelector('[data-section]');

const database = firebase.database();
const dbRef =  database.ref('Produto');
dbRef.on('value',(snapshoot)=>{
    atualizaDados(snapshoot)
    .then(()=>{
        const linkVerProduto = document.querySelectorAll('[data-ver-produto]');
        console.log(linkVerProduto);
        linkVerProduto.forEach(element => {
            element.addEventListener('click',verProduto);
        })
    })
})


const linkVerTudo = document.querySelector('[data-ver-tudo]');

linkVerTudo.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = 'ver-tudo.html';
})

