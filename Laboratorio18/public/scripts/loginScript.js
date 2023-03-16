// Elment query
const togglePasswordBtn = document.getElementById('show-pass');
const openEye = document.getElementById('open');
const closedEye = document.getElementById('closed');
const userField = document.getElementById('user');
const passwordField = document.getElementById('password');
const form = document.getElementById('login-form');
const notification = document.getElementById('notification');

const failParameter = new URLSearchParams(window.location.search).get('attempt');

if(failParameter === 'fail') {
    alert('El nombre o la contraseña son incorrectos');
}

togglePasswordBtn.onclick = () => {
    if(passwordField.type === 'password') {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
    openEye.classList.toggle('is-hidden');
    closedEye.classList.toggle('is-hidden');
}

form.onsubmit = () => {
    if(!userField.value || !passwordField.value) {
        notification.innerText = 'Tiene que llenar ambos campos';
        notification.classList.remove('is-hidden');
        return false;
    }
}

