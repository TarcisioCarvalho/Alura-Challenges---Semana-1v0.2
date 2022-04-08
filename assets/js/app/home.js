//window.location.href = "produtos.html";
const atualizaDados = (snapshoot) =>{
    console.log(snapshoot);
    console.log(snapshoot.val());
    snapshoot.forEach(element => {
        const data = element.val().nome;
        console.log(data);
    });
}

const database = firebase.database();
const dbRef =  database.ref('Produto');

dbRef.on('value',(snapshoot)=>{
    atualizaDados(snapshoot);
})