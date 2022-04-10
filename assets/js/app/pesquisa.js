
const link = window.location.href;
const url = new URL(link);
const searchParams = new URLSearchParams(url.search); // For active browser link, use location.search
const nome = searchParams.get('nome'); 

const database = firebase.database();
const dbRef =  database.ref('Produto');

const filtra = (snapshoot) =>{
    console.warn = () => {};
    snapshoot.forEach(element => {
        console.log(element.val().nome);
    });
}



    dbRef.orderByChild('nome').startAt(nome).endAt(nome + '\uf8ff').once('value')
    .then(filtra)
    .catch((e)=>{
    console.log('Erro');
})



