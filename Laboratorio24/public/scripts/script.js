const submitButton = document.getElementById('submit-button');
const inputPhoto = document.getElementById('input-photo');
const fileName = document.getElementById('file-name');
const grid = document.getElementById('grid');

class PhotoData {
    /**
     * @param {Number} id 
     * @param {String} path 
     */
    constructor(id, path) {
        this.id = id;
        this.path = path;
    }
}

inputPhoto.addEventListener('change', (ev) => {
    const file = inputPhoto.value.match(/[^\\]*$/)[0];
    if(file) {
        fileName.innerText = file;
        submitButton.disabled = false;
    } else {
        fileName.innerText = 'Upload photo';
        submitButton.disabled = true;
    }
});

/**
 * @param {HTMLImageElement} image
 */
const loadPhoto = (image) => {
    const parent = image.parentElement;
    const width = image.naturalWidth;
    const height = image.naturalHeight;
    const wide = (width/height > 1.5);
    const tall = (height/width > 1.5);

    if(wide) {
        parent.classList.add('card-wide');
    }
    if(tall){
        parent.classList.add('card-tall');
    }

}

/**
 * @param {[PhotoData]} photos 
 */
const updateUi = () => {
    fetch('photos', { method: 'GET' })
    .then(res => res.json())
    .then(res => {
        grid.innerHTML = ``;
        res.forEach(elem => {
            grid.innerHTML += `
            <div class="image-card">
                <img src="/uploads/${elem.path}" alt="photo" onload="loadPhoto(this)">
                <a class="delete-btn" data-imgid="${elem.id}" onclick="deletePhoto(this)">X</a>
            </div>`;
        });
    });
}

const sendFile = () => {
    const data = new FormData();
    data.append('photo', inputPhoto.files[0]);
    fetch('upload', {
        method: 'POST',
        body: data
    }).then(res => res.json()).then(res => {
        inputPhoto.value = '';
        fileName.innerText = 'Upload photo';
        submitButton.disabled = true;
        updateUi();
    });
}

/**
 * @param {HTMLElement} elem 
 */
const deletePhoto = (elem) => {
    const imageId = elem.dataset.imgid;
    fetch(`delete/${imageId}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => {
        if(res.deleted > 0) {
            updateUi();
        }
    });
}

updateUi();