const fileStream = require('fs')
const arr = [0,4,1,2,6,7,8,9,2,4,5,9,9,7,4,5,2,3,4,6,7,8];

// Recibe un arreglo y regresa su promedio
const mean = (arr) => {
    let acum = 0;
    arr.forEach((elem) => {
        acum += elem;
    });
    return acum / arr.length;
}

// Recibe una string y la escribe en un archivo de texto
const writeToFile = (str) => {
    fileStream.writeFile('file.txt', str, () => {console.log('El archivo se terminó de escribir \n *Abre file.txt')});
}

// Recibe un arrglo y regresa la moda
const mode = (arr) => {
    arr.sort();
    let number = arr[0];
    let mode = number;
    let acum = 1;
    let modeAcum = 1;

    arr.forEach((elem) => {
        if(elem === number) {
            ++acum;
        } else {
            if(acum > modeAcum) {
                modeAcum = acum;
                mode = number;
            }
            acum = 1;
            number = elem;
        }
    });
    return mode;
}

console.log('Promedio del arreglo: ', mean(arr));
writeToFile('Hola escribimos desde nodejs');
console.log('Moda del arreglo: ',mode(arr));

const http = require('http');
const server = http.createServer((req, res) => {
    let resText;
    console.log(req.url);
    if(req.url !== '/'){
        try {
            resText = fileStream.readFileSync(req.url.substring(1), 'utf-8');
            res.write(resText);
        } catch (err) {
            res.statusCode = 404;
            res.statusMessage = 'Not found';
            res.end();
        }
    } else {
        try {
            resText = fileStream.readFileSync('index.html', 'utf-8');
            res.write(resText);
        } catch (err) {
            res.statusCode = 404;
            res.statusMessage = 'Not found';
            res.end();
        }
    }
    res.end();
});

server.listen(3000, () => {console.log('Escuchando en http://localhost:3000');});