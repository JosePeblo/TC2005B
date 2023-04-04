const images = document.querySelectorAll('img');
const submitButton = document.getElementById('submit-button');
const inputPhoto = document.getElementById('input-photo');
const fileName = document.getElementById('file-name');

inputPhoto.addEventListener('change', (ev) => {
    const file = inputPhoto.value.match(/[^\\]*$/)[0];
    if(file) {
        fileName.innerText = file;
        submitButton.disabled = false;
    } else {
        fileName.innerText = 'Upload photo';
        submitButton.disabled = true;
    }
})

images.forEach(elem => {
    const width = elem.naturalWidth;
    const height = elem.naturalHeight;
    const wide = (width/height > 1.5);
    const tall = (height/width > 1.5);
    if(wide) {
        elem.classList.add('card-wide');
    }
    if(tall){
        elem.classList.add('card-tall');
    }
})