const submitButton = document.getElementById('submit-button');
const inputPhoto = document.getElementById('input-photo');
const fileName = document.getElementById('file-name');
const grid = document.getElementById('grid');
const roverSelect = document.getElementById('rover');
const solInput = document.getElementById('sol');
const noPhotos = document.getElementById('no-photos');

let rover = 'curiosity';
let sol = '1000';

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

const updateUi = () => {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=1&api_key=JTeMXtyfNmtph0cxiHKBGn3YOaoAkZzJfwGQtwMx`, { 
        method: 'GET' 
    })
    .then(res => res.json())
    .then(res => {
        const {photos} = res;
        console.log(photos);
        grid.innerHTML = ``;
        if(photos.length > 0){
            noPhotos.style.display = 'none';
            photos.forEach(photo => {
                grid.innerHTML += `
                <div class="image-card">
                    <img src="${photo.img_src}" alt="photo" onload="loadPhoto(this)">
                </div>`;
            });
        } else {
            noPhotos.style.display = 'block';
        }
    });
}

updateUi();

roverSelect.addEventListener('change', ev => {
    rover = roverSelect.value;
    updateUi();
});

solInput.addEventListener('change', ev => {
    sol = solInput.value;
    updateUi();
});