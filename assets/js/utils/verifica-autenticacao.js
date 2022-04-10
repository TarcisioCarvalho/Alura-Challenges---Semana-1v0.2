const verficaAutenticacao = async () => {

    firebase.auth().onAuthStateChanged((user)=>{        
            if(user){
                alert('Logado');
            } 
            else {
                alert('Deslogado');
            }
    })
} 

export {verficaAutenticacao}