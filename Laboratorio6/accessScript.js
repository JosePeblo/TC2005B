const paramstring = window.location.search;
const params = new URLSearchParams(paramstring);
const content = document.getElementById('content');
const userName = params.get('user');
const header = document.createElement('h1');

if(!paramstring || userName === ''){
    header.innerHTML = `Hello, you shouldn't be here 😡`;
} else {
    header.innerHTML = `Hello ${userName}`;
}



content.insertBefore(header, content.firstChild);
