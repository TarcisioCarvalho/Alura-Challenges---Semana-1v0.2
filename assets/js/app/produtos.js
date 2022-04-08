
const  LoGa =  () => {
    firebase.auth().signInWithEmailAndPassword('tarcisio@tarcisio.com','123456')
    .then(()=>{
        alert('logado');
    });
}
LoGa()

const cadastraProduto = (e) => {
    e.preventDefault();
    alert('clicou');
    const imagem = arquivo.files[0];
   if(imagem.type.includes('image')) {
       const date =  Date.now();
       console.log(date);
       const nome = date + '-' + imagem.name;
       const caminho = 'Produtos/' + nome;
       const storeRef = firebase.storage().ref(caminho);
        storeRef.put(imagem)
        .then((Elemento)=>{
            storeRef.getDownloadURL()
            .then((url)=>{
                console.log(name.value);
                const data = {
                    id:date,
                    url_imagem: url,
                    nome: name.value,
                    preco: preco.value,
                    categoria: categoria.value,
                    descricao: descricao.value
                }
                console.log(data)
                dbRef.push(data).then((data)=>{
                    console.log('Funcionou!');
                }).catch(()=> console.log('Deu ruim'));
            } )
            
        })
       
   };
}


const cadastraProdutoSemImagem = (e) =>{
    e.preventDefault();
    if(name.value !== ''){
        const data = {
            nome: name.value
        }
        dbRef.child(firebase.auth().currentUser.uid).push(data)
        .then(()=>{
            console.log('Tarefa add com sucesso');
        })
    }
}

const name =  document.querySelector('[data-nome]')
const preco =  document.querySelector('[data-preco]')
const descricao = document.querySelector('[data-descricao]')
const categoria = document.querySelector('[data-categoria]');
const botaoProduto = document.querySelector('[data-botao-produto]');
const arquivo = document.querySelector('[data-arquivo]');
const database = firebase.database();
const dbRef =  database.ref('Produto');
botaoProduto.addEventListener('click',cadastraProduto);