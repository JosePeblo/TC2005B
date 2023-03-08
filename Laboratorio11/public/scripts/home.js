const recipeFeed = document.getElementById('recipe-feed');
const navMenu = document.getElementById('nav-menu');

fetch('./recetas').then(res => res.json()).then(res => {
    res.forEach((elem) => {
        const element = document.createElement('div');
        element.classList = 'column is-3';
        element.innerHTML = `
        <article class="card">
            <div class="card-image">
                <a href="${elem.href}">
                    <figure class="image is-4by3">
                        <img src="${elem.src}" alt="Receta" style="object-fit:cover;">
                    </figure>
                </a>
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">${elem.name}</p>
                            <p class="subtitle is-6">Por: ${elem.author}</p>
                        </div>
                    </div>
                    <div class="content">
                        ${elem.desc}
                    </div>
                </div>
            </div>
        </article>
        `;
        recipeFeed.append(element);
    });
}).catch(() => {
    recipeFeed.innerText = 'Parece que no hay recetas 😥';
});


const toggleMenu = () => {
    navMenu.classList.toggle('is-active');
}