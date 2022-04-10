

import {desloga} from "../utils/desloga.js"

desloga();


const tentativaLogar = (e) =>{
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email.value,senha.value)
    .then(()=>{
        window.location.href = 'menu-adm.html'
    })
    .catch((e)=> {
        alert('Email ou Senha Incorretos, Tente Novamente!');
        email.value = '';
        senha.value = '';
    })
}



const email = document.querySelector('[data-email]');
const senha = document.querySelector('[data-senha]');

const botaoAutenticar = document.querySelector('[data-autenticar]');
botaoAutenticar.addEventListener('click',tentativaLogar);




