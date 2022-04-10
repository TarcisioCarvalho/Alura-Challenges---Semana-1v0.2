const redirecionaLogin = (e)=>{
    e.preventDefault();
    window.location.href ='login.html';
}


const pesquisa = (e) =>{
    e.preventDefault()
    if(e.keyCode === 13){
        window.location.href = `pesquisa.html?nome=${e.target.value}`;
    }
}

const aparecePesquisa = (e) =>{

    e.preventDefault();
    buttonLogin.classList.toggle('none');
    inputPesquisaMobile.classList.toggle('none');
}


const buttonLogin = document.querySelector('[data-button-login]');
buttonLogin.addEventListener('click',redirecionaLogin);
const inputPesquisa = document.querySelector('[data-pesquisa]');
inputPesquisa.addEventListener('keyup',pesquisa);
const vectorPesquisa = document.querySelector('[data-vector-pesquisa]');
vectorPesquisa.addEventListener('click',aparecePesquisa);
const inputPesquisaMobile = document.querySelector('[data-input-mobile]');
inputPesquisaMobile.addEventListener('keyup',pesquisa);
