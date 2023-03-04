// Regex witchcraft
const validPass = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[ ¡!"#$%&\'()*+,\-./:;<=>¿?@[\\\]^_`{|}~])[A-Za-z0-9 ¡!"#$%&\'()*+,\-./:;<=>¿?@[\\\]^_`{|}~]{8,}/g;
const lowercase = /(?=.*[a-z]).*/g;
const uppercase = /(?=.*[A-Z]).*/g;
const digits = /(?=.*[0-9]).*/g;
const special = /(?=.*[ ¡!"#$%&\'()*+,\-./:;<=>¿?@[\\\]^_`{|}~]).*/g;

// Elment query
const userField = document.getElementById('user');
const userMessage = document.getElementById('user-message');
const validatorMessage = document.getElementById('validator-message');
const confirmationMessage = document.getElementById('conf-message');
const passwordField = document.getElementById('password');
const passwordConfirmation = document.getElementById('confirmPass');
const togglePasswordBtn = document.getElementById('show-pass');
const submitBtn = document.getElementById('submit-btn');
const form = document.getElementById('sign-up-form');

// Bad practices 
const childs = togglePasswordBtn.childNodes;
const eyeOpen = childs[0];
const eyeClosed = childs[1];
eyeClosed.style.display = 'block';
eyeOpen.style.display = 'none';

const failParameter = new URLSearchParams(window.location.search).get('attempt');

if(failParameter === 'badUser') {
    alert('El nombre de usuario ya existe');
}

passwordField.addEventListener('input', (ev) => {
    const password = passwordField.value;
    validatorMessage.innerText = '';
    passwordConfirmation.disabled = true;
    if(password.length < 8) {
        validatorMessage.innerText = 'Password must be at least 8 characters long';
    } else {
        const match = password.match(validPass);
        if(!match) {
            validatorMessage.innerText = 'The password must contain:\n';
            if(!password.match(lowercase))
                validatorMessage.innerText += '*Lower case letters [a-z]\n';
            if(!password.match(uppercase))
                validatorMessage.innerText += '*Upper case letters [A-Z]\n';
            if(!password.match(digits))
                validatorMessage.innerText += '*Numbers\n';
            if(!password.match(special))
                validatorMessage.innerText += '*Special characters [ space¡!"#$%&\'()*+,-./\\:;<=>¿?@[]^_`{}|~ ]\n';
        } else if (match[0].length !== password.length || match.length !== 1) {
            validatorMessage.innerText = 'The password must use only normal ascii characters';
        } else {
            passwordConfirmation.disabled = false;
        }
    }
});

passwordConfirmation.addEventListener('input', (ev) => {
    const password = passwordField.value;
    const passConf = passwordConfirmation.value;
    submitBtn.disabled = true;
    confirmationMessage.innerText = '';
    if(password !== passConf) {
        confirmationMessage.innerText = `Passwords don't match`;
    } else {
        submitBtn.disabled = false;
    }
});

togglePasswordBtn.onclick = () => {
    if(passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordConfirmation.type = 'text';
        eyeClosed.style.display = 'none';
        eyeOpen.style.display = 'block';
    } else {
        passwordField.type = 'password';
        passwordConfirmation.type = 'password';
        eyeClosed.style.display = 'block';
        eyeOpen.style.display = 'none';
    }
}

const checkInput = () => { 
    if(!userField.value) {
        userMessage.style.display = 'block';
        userMessage.innerText = 'You must fill this field'
    } else {
        userMessage.style.display = null;
        userMessage.innerText = ''
    }
}
form.onsubmit = (ev) => {
    if(!userField.value) {
        userMessage.innerText = 'You must fill this field'
        userMessage.style.display = 'block';
        userField.addEventListener('input', checkInput)
        return false
    }
}
