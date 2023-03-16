// Regex witchcraft
const validPass = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[ ¡!"#$%&\'()*+,\-./:;<=>¿?@[\\\]^_`{|}~])[A-Za-z0-9 ¡!"#$%&\'()*+,\-./:;<=>¿?@[\\\]^_`{|}~]{8,}/g;
const lowercase = /(?=.*[a-z]).*/g;
const uppercase = /(?=.*[A-Z]).*/g;
const digits = /(?=.*[0-9]).*/g;
const special = /(?=.*[ ¡!"#$%&\'()*+,\-./:;<=>¿?@[\\\]^_`{|}~]).*/g;

// Elment query
const togglePasswordBtn = document.getElementById('show-pass');
const openEye = document.getElementById('open');
const closedEye = document.getElementById('closed');
const userField = document.getElementById('user');
const passwordField = document.getElementById('password');
const passwordConfirmation = document.getElementById('confirmPass');
const form = document.getElementById('login-form');
const notification = document.getElementById('notification');
const passwordAlert = document.getElementById('password-alert');
const submitBtn = document.getElementById('submit-btn');

const failParameter = new URLSearchParams(window.location.search).get('attempt');

if(failParameter === 'badUser') {
    alert('El nombre de usuario ya existe');
}
if(failParameter === 'badRequest') {
    alert('Los campos no fueron llenados correctamente');
}

togglePasswordBtn.onclick = () => {
    if(passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordConfirmation.type = 'text';
    } else {
        passwordField.type = 'password';
        passwordConfirmation.type = 'password';
    }
    openEye.classList.toggle('is-hidden');
    closedEye.classList.toggle('is-hidden');
}

form.onsubmit = () => {
    if(!userField.value || !passwordField.value || !passwordConfirmation.value) {
        notification.innerText = 'Tiene que llenar todos';
        notification.classList.remove('is-hidden');
        return false;
    }
}

passwordField.addEventListener('input', (ev) => {
    const password = passwordField.value;
    passwordAlert.innerText = '';
    passwordConfirmation.disabled = true;
    if(password.length < 8) {
        passwordAlert.innerText = 'La contraseña debe se de mínimo 8 caracteres';
    } else {
        const match = password.match(validPass);
        if(!match) {
            console.log('mundo');
            passwordAlert.classList.remove('is-hidden');
            passwordAlert.innerText = 'La contraseña debe contener:\n';
            if(!password.match(lowercase))
                passwordAlert.innerText += '*Letras minúsculas [a-z]\n';
            if(!password.match(uppercase))
                passwordAlert.innerText += '*Letras mayúsculas [A-Z]\n';
            if(!password.match(digits))
                passwordAlert.innerText += '*Números\n';
            if(!password.match(special))
                passwordAlert.innerText += '*Caracteres especiales [ espacio¡!"#$%&\'()*+,-./\\:;<=>¿?@[]^_`{}|~ ]\n';
        } else if (match[0].length !== password.length || match.length !== 1) {
            passwordAlert.classList.remove('is-hidden');
            passwordAlert.innerText = 'La contraseña debe de usar solamente caracteres normales de ascii';
        } else {
            passwordAlert.classList.add('is-hidden');
            passwordConfirmation.disabled = false;
        }
    }
});

passwordConfirmation.addEventListener('input', (ev) => {
    const password = passwordField.value;
    const passConf = passwordConfirmation.value;
    submitBtn.disabled = true;
    notification.innerText = '';
    if(password !== passConf) {
        notification.classList.remove('is-hidden');
        notification.innerText = `Las contraseñas no son iguales`;
    } else {
        notification.classList.add('is-hidden');
        submitBtn.disabled = false;
    }
});