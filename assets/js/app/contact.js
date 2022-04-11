const formulario = document.querySelector('[data-formulario]');
const fields = document.querySelectorAll('[required]');




const validaFormulario = (e) =>{
    e.preventDefault();
}

formulario.addEventListener('submit',validaFormulario);