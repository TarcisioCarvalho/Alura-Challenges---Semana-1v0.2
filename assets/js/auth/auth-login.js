const tentativaLogar = (e) =>{
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email.value,senha.value)
    .then(()=>console.log('Logado com sucesso'))
    .catch((e)=> console.log('Falaha no login'))
}

const tentativaCadastrar = (e) =>{
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email.value,senha.value)
    .then(()=>console.log('Logado com sucesso'))
    .catch((e)=> console.log('Falaha no login'))
}

const email = document.querySelector('[data-email]');
const senha = document.querySelector('[data-senha]');

const botaoAutenticar = document.querySelector('[data-autenticar]');
botaoAutenticar.addEventListener('click',tentativaLogar)
const botaoCadastrar = document.querySelector('[data-cadastrar]');
botaoCadastrar.addEventListener('click',tentativaCadastrar)