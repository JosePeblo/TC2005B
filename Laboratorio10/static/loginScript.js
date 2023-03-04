// Elment query
const userField = document.getElementById('user');
const userMessage = document.getElementById('user-message');
const validatorMessage = document.getElementById('validator-message');
const passwordField = document.getElementById('password');
const togglePasswordBtn = document.getElementById('show-pass');
const submitBtn = document.getElementById('submit-btn');
const form = document.getElementById('login-form');

// Bad practices 
const childs = togglePasswordBtn.childNodes;
const eyeOpen = childs[0];
const eyeClosed = childs[1];
eyeClosed.style.display = 'block';
eyeOpen.style.display = 'none';

const failParameter = new URLSearchParams(window.location.search).get('attempt');

if(failParameter === 'fail') {
    alert('El nombre o la contraseña son incorrectos');
}

togglePasswordBtn.onclick = () => {
    if(passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeClosed.style.display = 'none';
        eyeOpen.style.display = 'block';
    } else {
        passwordField.type = 'password';
        eyeClosed.style.display = 'block';
        eyeOpen.style.display = 'none';
    }
}

const checkInputUser = () => { 
    if(!userField.value) {
        userMessage.style.display = 'block';
        userMessage.innerText = 'Tiene que llenar este campo'
    } else {
        userMessage.style.display = null;
        userMessage.innerText = '';
    }
    if(!passwordField.value) {
        validatorMessage.style.display = 'block';
        validatorMessage.innerText = 'Tiene que llenar este campo'
    } else {
        validatorMessage.style.display = null;
        validatorMessage.innerText = '';
    }
}

const checkInputPassword = () => { 
    if(!passwordField.value) {
        validatorMessage.style.display = 'block';
        validatorMessage.innerText = 'Tiene que llenar este campo'
    } else {
        validatorMessage.style.display = null;
        validatorMessage.innerText = '';
    }
}
form.onsubmit = () => {
    let state = true;
    if(!userField.value) {
        userMessage.innerText = 'Tiene que llenar este campo'
        userMessage.style.display = 'block';
        userField.addEventListener('input', checkInputUser);
        state = false;
    }
    if (!passwordField.value) {
        validatorMessage.innerText = 'Tiene que llenar este campo'
        validatorMessage.style.display = 'block';
        passwordField.addEventListener('input', checkInputPassword);
        state = false;
    }
    return state;
}
