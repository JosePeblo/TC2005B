/*
<div class="card">
    <img src="https://m.media-amazon.com/images/I/91813DxgFwL._AC_SL1500_.jpg" alt="prod">
    <h3>Pantalones chidos</h3>
    <p><strong>$</strong></p>
    <button class="card-button">Comprar</button>
</div>
*/

const cardFeed = document.getElementById('card-feed');

const createCards = (arr) => {
    arr.forEach((elem) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <img src="${elem.image}" alt="prod">
        <h3>${elem.name}</h3><p><strong>$${elem.price}</strong></p>
        <button class="card-button">Comprar</button>`;
        cardFeed.append(div);
    });
}


fetch('products').then(res => res.json()).then(res => createCards(res));