const atualizaDados = (snapshoot) =>{
    console.log(snapshoot);
    console.log(snapshoot.val());
    snapshoot.forEach(element => {
        const nomeProduto = element.val().nome;
        const precoProduto = element.val().preco;
        const urlImagem = element.val().url_imagem;
        sectionCards.innerHTML += `<article class="cards__produto">
        <img src=${urlImagem} alt="" class="cards__produto--imagem">
        <h3 class="cards__produto--titulo">${nomeProduto}</h3>
        <p class="cards__produto--preco">${precoProduto}</p>
        <a href="" class="cards__produto--link">Ver produto</a>
    </article>`
    });
}
const sectionCards = document.querySelector('[data-cards]');
const database = firebase.database();
const dbRef =  database.ref('Produto');
dbRef.on('value',(snapshoot)=>{
    atualizaDados(snapshoot);
})