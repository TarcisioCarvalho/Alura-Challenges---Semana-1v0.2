
    const addProduto = (e) =>{
        e.preventDefault();
        window.location.href = 'produtos.html';
    }
    
    
    const body = document.querySelector('[data-body]');
    const buttonAddProduct = document.querySelector('[data-add-produto]');
    buttonAddProduct.addEventListener('click',addProduto);

    

    firebase.auth().onAuthStateChanged((user)=>{        
        if(user){
            const buttonLogin = document.querySelector('[data-button-login]');
            buttonLogin.innerText = 'Logout';
            buttonLogin.addEventListener('click',deslogar);
            body.classList.toggle('none');
            buscaDados();
        } 
        else {
            window.location.href = 'login.html';
        }
    })

    const Editar = (e) =>{

        e.preventDefault();
        const chave = e.target.parentNode.parentNode.parentNode.children[4].innerText;
        const chaveTratado =  chave.substring(1,);
        window.location.href = `produtos.html?chave=${chaveTratado}`;

    }
    const removeImage = (urlImagemDeletar) =>{
        firebase.storage().refFromURL(urlImagemDeletar).delete()
        .then(location.reload());
    }
    
    const tentativaExcluir = (e) =>{

        body.classList.toggle('none');
        const database = firebase.database();
        const keyProdutoDeletar = e.target.parentNode.parentNode.parentNode.children[4].innerText.substring(1,)
        const dbRef =  database.ref('Produto');
        const urlImagemDeletar = e.target.parentNode.parentNode.children[0].src
         dbRef.child(keyProdutoDeletar).remove()
        .then(()=>{
            removeImage(urlImagemDeletar);
        })
         
    }

    const Excluir = (e) =>{
        e.preventDefault();
        const Confirm  = confirm('Deseja Excluir?');
        if(Confirm) tentativaExcluir(e);
    }

    const atribuiEventos = () =>{

        const editar = document.querySelectorAll('[data-editar]');
        editar.forEach(element =>{
            element.addEventListener('click',Editar);
        })

        const excluir = document.querySelectorAll('[data-excluir]');
        excluir.forEach(element =>{
            element.addEventListener('click',Excluir);
        })
    }

    const atualizaDados = async (snapshoot,sectionTodosProdutos,animation) =>{
        
        snapshoot.forEach(element => {
            const keyProduto = element.key;
            const nomeProduto = element.val().nome;
            const precoProduto = element.val().preco;
            const urlImagem = element.val().url_imagem;
            const idProduto = element.val().id;
            const descricaoProduto = element.val().descricao
            sectionTodosProdutos.innerHTML += 
            `<article class="cards__produto">
                <div class="cards__produto--imagem card__produto-home--imagem">
                    <img src=${urlImagem} alt=${descricaoProduto} class="cards__produto--imagem">
                    <a href="" data-excluir><img src="./assets/icos/VectorLixeira.svg" alt = "Excluir"  class="cards__produto-home--icones cards__produto-home--icones--lixeira"></a>
                    <a href="" data-editar><img src="./assets/icos/VectorEditar.svg" alt="Editar"  class="cards__produto-home--icones cards__produto-home--icones--editar"></a>
                </div>
                <h3 class="cards__produto--titulo">${nomeProduto}</h3>
                <p class="cards__produto--preco">$${precoProduto}</p>
                <p href="" class="cards__produto--id">#${idProduto}</p>
                <p href="" class="cards__produto--id none" data-key>#${keyProduto}</p>
            </article>`
        });
        atribuiEventos();
    }

    const buscaDados =  () =>{

        const sectionTodosProdutos = document.querySelector('[data-todos-produtos]');
        const database = firebase.database();
        const dbRef =  database.ref('Produto');
        const animation = document.querySelector('[data-animation]');
        dbRef.on('value',(snapshoot)=>{
            atualizaDados(snapshoot,sectionTodosProdutos,animation)
        })
    }
    const deslogar = (e) =>{
        e.preventDefault();
        firebase.auth().signOut()
        .then(()=>{
            window.location.href = 'login.html';
        })
    }

    