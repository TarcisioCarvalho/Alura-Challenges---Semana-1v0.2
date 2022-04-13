

console.warn = () => {};
const body = document.querySelector('[data-body]');
const link = window.location.href;
const url = new URL(link);
const searchParams = new URLSearchParams(url.search); // For active browser link, use location.search
const chave = searchParams.get('chave'); 
let editarVerificacao = false;
let vertorUrlImagens = [];


const inputImagem = document.querySelector('[data-arquivo-imagem]');

const meuArquivo = document.querySelector('[data-arquivo]');
const divInputArquivo = meuArquivo.closest('[data-div-arquivo]');
const buttonArquivo = document.querySelectorAll('[data-button-arquivo]');

buttonArquivo.forEach(button =>{
    button.addEventListener('click',e=>{
        e.preventDefault();
        meuArquivo.click();
    })
})

divInputArquivo.addEventListener('click',e =>{
    meuArquivo.click();
});

meuArquivo.addEventListener('change',e=>{
    if(meuArquivo.files.length){
        updateImgArquivo(divInputArquivo,meuArquivo.files[0])
    }
})

divInputArquivo.addEventListener('dragover', e =>{
    e.preventDefault();
    divInputArquivo.classList.add('produto-cadastro__formulario--arquivos-over');
})

divInputArquivo.addEventListener('dragleave', e =>{
    divInputArquivo.classList.remove('produto-cadastro__formulario--arquivos-over');
})

divInputArquivo.addEventListener('dragend',e =>{
    divInputArquivo.classList.remove('produto-cadastro__formulario--arquivos-over');
})

divInputArquivo.addEventListener('drop',e=>{
    e.preventDefault();
    if(e.dataTransfer.files){
        meuArquivo.files = e.dataTransfer.files;
        updateImgArquivo(divInputArquivo,e.dataTransfer.files[0])
    }
    divInputArquivo.classList.remove('produto-cadastro__formulario--arquivos-over')
})

const updateImgArquivo = (divInputArquivo,file) =>{
    const textoArquivo = divInputArquivo.querySelector('[data-texto-arquivo]');
    const imgArquivo = divInputArquivo.querySelector('[data-arquivo-img]');
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () =>{
        textoArquivo.classList.add('none');
        imgArquivo.classList.remove('none');
        divInputArquivo.style.backgroundColor = 'transparent';
        imgArquivo.style.backgroundImage = `url(${reader.result})`
    };
}

const updateImgArquivoEditavel = (divInputArquivo,arquivo)=>{
    const textoArquivo = divInputArquivo.querySelector('[data-texto-arquivo]');
    const imgArquivo = divInputArquivo.querySelector('[data-arquivo-img]');
    textoArquivo.classList.add('none');
    imgArquivo.classList.remove('none');
    divInputArquivo.style.backgroundColor = 'transparent';
    imgArquivo.style.backgroundImage = `url(${arquivo})`
}

const menuAdm = (e) =>{

    e.preventDefault();
    window.location.href = 'menu-adm.html';

}


    
const dadosEditaveis =  (snapshoot) =>{
        name.value = snapshoot.val().nome;
        arquivo.file = snapshoot.val().url_imagem;
        updateImgArquivoEditavel(divInputArquivo,arquivo.file)
        vertorUrlImagens.push(snapshoot.val().url_imagem);
        descricao.value = snapshoot.val().descricao;
        preco.value = snapshoot.val().preco;
        categoria.value = snapshoot.val().categoria;
        editarVerificacao=true;
        carregaImagem.classList.toggle('none');
        aguardeMsg.classList.toggle('animation__frase');
        aguardeMsg.classList.toggle('none'); 
        mainData.classList.toggle('none');
}

const verificaEdicao = () =>{

   
    if(!chave){
        carregaImagem.classList.toggle('none');
        aguardeMsg.classList.toggle('animation__frase');
        aguardeMsg.classList.toggle('none'); 
        mainData.classList.toggle('none');
        return
    } 

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
        mainData.classList.toggle('none');
        carregaImagem.classList.toggle('none');
        aguardeMsg.classList.toggle('data-img-animation');
        aguardeMsg.classList.toggle('none');
        const data = {
            nome: name.value,
            preco: preco.value,
            categoria: categoria.value,
            descricao: descricao.value
        }
        
        dbRef.child(chave).update(data)
        .then(()=>{
           
            mainData.classList.toggle('none');
            carregaImagem.classList.toggle('none');
            aguardeMsg.classList.toggle('data-img-animation');
            aguardeMsg.classList.toggle('none');
            alert('Produto Atualizado com sucesso!');
            location.reload();
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
                   
                   if(!(vertorUrlImagens[0] === data.url_imagem)){
                    firebase.storage().refFromURL(vertorUrlImagens[0]).delete()
                    .then(()=>{
                        mainData.classList.toggle('none');
                        carregaImagem.classList.toggle('none');
                        aguardeMsg.classList.toggle('data-img-animation');
                        aguardeMsg.classList.toggle('none');
                        alert('Produto Atualizado com sucesso!');
                        location.reload();
                    });
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
        console.log('Cheguei aqui');
        /* aguardeMsg.classList.toggle('data-img-animation');
        aguardeMsg.classList.toggle('none'); */

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

/* const verificaCampoNome = (e) =>{
    let flag = true;
   if(e.target.validity.valueMissing && flag){
       
        const MsgErro = document.querySelector('[data-span-erro-nome]');
        MsgErro.classList.toggle('none');
   }
}

   const verificaCampoCategoria = (e)=>{

    if(e.target.validity.valueMissing){
        const MsgErro = document.querySelector('[data-span-erro-categoria]');
        MsgErro.classList.toggle('none');
    }  
   }


name.addEventListener('blur',verificaCampoNome);
name.addEventListener('blur',verificaCampoCategoria); */


const args = {
    prefix: 'R$ ',
    suffix: '',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '.',
    cursor: 'end'
  };

  try{
    SimpleMaskMoney.setMask(preco,args)
  }catch(e){
    
  }



formularioProduto.addEventListener('submit',(e)=>{
    try{
        cadastraProduto(e);
    }catch(e){
        alert('Preencha correntamente!');
    }
});




