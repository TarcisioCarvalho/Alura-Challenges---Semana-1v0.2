


const body = document.querySelector('[data-body]');
const link = window.location.href;
const url = new URL(link);
const searchParams = new URLSearchParams(url.search); // For active browser link, use location.search
const chave = searchParams.get('chave'); 
let editarVerificacao = false;
let vertorUrlImagens = [];


const inputImagem = document.querySelector('[data-arquivo-imagem]');

const menuAdm = (e) =>{

    e.preventDefault();
    window.location.href = 'menu-adm.html';

}


    
const dadosEditaveis =  (snapshoot) =>{
        name.value = snapshoot.val().nome;
        arquivo.file = snapshoot.val().url_imagem;
        vertorUrlImagens.push(snapshoot.val().url_imagem);
        descricao.value = snapshoot.val().descricao;
        preco.value = snapshoot.val().preco;
        categoria.value = snapshoot.val().categoria;
        editarVerificacao=true;
        console.log(vertorUrlImagens);
}

const verificaEdicao = () =>{

   
    if(!chave) return

      dbRef.child(chave).on('value',dadosEditaveis);
    
    
}

 firebase.auth().onAuthStateChanged((user)=>{        
   if(user){
       const buttonLogin = document.querySelector('[data-button-login]');
       buttonLogin.innerText = 'Menu Administrador';
       buttonLogin.addEventListener('click',menuAdm);
       body.classList.toggle('none');
       return verificaEdicao();
   }else{
        window.location.href = 'login.html';
   }
})

const updadeDados = (imagem) =>{
    if(!imagem){
        const data = {
            nome: name.value,
            preco: preco.value,
            categoria: categoria.value,
            descricao: descricao.value
        }
        console.log('Estou Aqui Sem trocar imagem');
        dbRef.child(chave).update(data)
        .then(()=>{
            console.log('Atualizado com sucesso!');
        })

    }else{
        if(imagem.type.includes('image'))
         {

        const date =  Date.now();
        const nome = date + '-' + imagem.name;
        const caminho = 'Produtos/' + nome;
        const storeRef = firebase.storage().ref(caminho);
        storeRef.put(imagem)
        .then((Elemento)=>{
            storeRef.getDownloadURL()
            .then((url) => {

                const data = {
                    url_imagem: url,
                    nome: name.value,
                    preco: preco.value,
                    categoria: categoria.value,
                    descricao: descricao.value
                }
                

                dbRef.child(chave).update(data)
               .then(()=>{
                   console.log('Cheguei aqui');
                   console.log(vertorUrlImagens[0]);
                   console.log(data.url_imagem);
                   if(!(vertorUrlImagens[0] === data.url_imagem)){
                    firebase.storage().refFromURL(vertorUrlImagens[0]).delete()
                    .then(console.log('funcionou'));
                   }
               }) 
                

            })
        })
          



           

        }

        
    }
}

const cadastraProduto = (e) => {
    
    e.preventDefault();

    
    const imagem = arquivo.files[0];
    console.log(vertorUrlImagens);

    

    if(editarVerificacao){
        
        updadeDados(imagem)

    }else{

    


    
    if(imagem.type.includes('image')) {

       const date =  Date.now();
       const nome = date + '-' + imagem.name;
       const caminho = 'Produtos/' + nome;
       const storeRef = firebase.storage().ref(caminho);

        mainData.classList.toggle('none');
        carregaImagem.classList.toggle('none');
        aguardeMsg.classList.toggle('none');
        storeRef.put(imagem)
        .then((Elemento)=>{
            storeRef.getDownloadURL()
            .then((url)=>{
                
                const data = {
                    id:date,
                    url_imagem: url,
                    nome: name.value,
                    preco: preco.value,
                    categoria: categoria.value,
                    descricao: descricao.value
                }

                dbRef.push(data).then((data)=>
                {
                    alert('Produto cadastrado com sucesso!');
                    location.reload();

                }).catch(()=> console.log('Deu ruim')) 
            } )
            
        })}
       
   };
}







const name =  document.querySelector('[data-nome]')
const preco =  document.querySelector('[data-preco]')
const descricao = document.querySelector('[data-descricao]')
const categoria = document.querySelector('[data-categoria]');
const botaoProduto = document.querySelector('[data-botao-produto]');
const arquivo = document.querySelector('[data-arquivo]');
const mainData = document.querySelector('[data-main]'); 
const carregaImagem = document.querySelector('[data-img-animation]');
const aguardeMsg = document.querySelector('[ data-animation-frase]');
const formularioProduto = document.querySelector('[data-produto-formulario]');
const database = firebase.database();
const dbRef =  database.ref('Produto');

formularioProduto.addEventListener('submit',(e)=>{
    try{
        cadastraProduto(e);
    }catch(e){
        alert('Prencha correntamente!');
    }
});




