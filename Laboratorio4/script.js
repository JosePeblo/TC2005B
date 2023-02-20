// Código para hacer scroll to top button
const topButton = document.getElementById('topButton');
window.onscroll = () => {
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = 'block'
    } else {
        topButton.style.display = 'none'
    }
}

const returnToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


// Ejercicios de javascript
const problem1 = () => {
    let answer = prompt('Ejemplo tabla: \nEscribe un número');
    
    const container = document.getElementById('problem1');
    let content = '<table><thead><tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr></thead><tbody>';
    
    for(; answer > 0; answer--){
        content += `<tr><td>${answer}</td><td>${Math.pow(answer, 2)}</td><td>${Math.pow(answer, 3)}</td></tr>`;
    }
    content += '</tbody></table>';
    container.innerHTML = content;
}

const problem2 = () => {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    const sum = num1 + num2;
    const start = new Date();
    const answer = prompt(`${num1}+${num2}`);
    const timeElapsed = (new Date()-start)/1000;

    const container = document.getElementById('problem2');
    
    if(answer == num1+num2){
        container.innerHTML = `<p><strong>La respuesta es correcta, ${num1} + ${num2} = ${sum}</strong></p>`;
    } else {
        container.innerHTML = `<p><strong>La respuesta es incorrecta, ${num1} + ${num2} ≠ ${answer}<br>
                                Respuesta correcta: ${num1} + ${num2} = ${num1+num2}</strong></p>`;
    }
    container.innerHTML += `<p><strong>Tiempo de respuesta: ${timeElapsed}s</strong></p>`;
}

const problem3 = (arr) => {
    let neg = zero = pos = 0;
    arr.forEach(elem => {
        if(elem < 0) {neg++}
        else if(elem == 0) {zero++}
        else if(elem > 0) {pos++}
    });
    return {neg: neg, zero: zero, pos: pos};

}

const problem4 = (mat) => {
    if(!Array.isArray(mat)) return [];
    const resArrary = new Array()
    mat.forEach(arr => {
        if(arr.length === 0) return;
        if(!Array.isArray(arr)) return;
        let acum = 0;
        arr.forEach(elem => { 
            if(!isNaN(elem)) acum += elem;
        });
        resArrary.push(acum/arr.length);
    })
    return resArrary;
}

const problem5 = (num) => {
    if(isNaN(num)) return NaN;
    let res = 0, residue;
    while(num !== 0){
        residue = num%10;
        res = res * 10 + residue;
        num = Math.floor(num / 10);
    }
    return res;
}

const documentHeight = () => {
    const body = document.body,
          html = document.documentElement;
    return Math.max(body.scrollHeight, body.offsetHeight, 
                    html.clientHeight, html.scrollHeight, html.offsetHeight);

}

const ponPinguino = () => {
    const sound = new Audio('./assets/squeak.mp3');
    sound.play();
    for(let i = 0; i < 10; i++){
        let posx = Math.floor(Math.random() * document.body.clientWidth-100);
        let posy = Math.floor(Math.random() * documentHeight()-100);
        let elem = document.createElement('img');
        if(Math.floor(Math.random() * 9) === 1) {
            elem.src = './assets/marinela.png';
        }
        else {
            elem.src = './assets/pingu.png';
        }
        elem.style.position = 'absolute';
        elem.style.left = `${posx}px`;
        elem.style.top = `${posy}px`;
        elem.classList = 'penguin';
        document.body.appendChild(elem);
    }
}

