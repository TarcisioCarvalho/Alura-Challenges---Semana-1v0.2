    const Card = () =>{
    const verProduto =  (event)=>{
        event.preventDefault();
        const articleProduto = (event.target).parentNode.parentNode.removeChild((event.target).parentNode);
        console.log(articleProduto);
        const id = articleProduto.children[4].innerText;
        console.log(id);
        const categoria = articleProduto.children[5].innerText;
        console.log(categoria);
        window.location= `ver-produto.html?id=${id}&categoria=${categoria}`;
    }
    
    const linkVerProduto = document.querySelector('[data-ver-produto]');
    linkVerProduto.addEventListener('click',verProduto);
    
   }
    
   Card()
    
   





