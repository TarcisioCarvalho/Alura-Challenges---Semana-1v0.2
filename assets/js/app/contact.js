const formulario = document.querySelector('[data-formulario]');
const fields = document.querySelectorAll('[required]');


const custonValidation = (e) =>{
    const field = e.target;
    field.setCustomValidity('Esse campo é obrigatório');
}

fields.forEach(field =>{
    field.addEventListener('invalid', custonValidation)
})


const validaFormulario = (e) =>{
    e.preventDefault();
}

formulario.addEventListener('submit',validaFormulario);