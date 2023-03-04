const http = require('http');
const { readFile } = require('fs');
const { validatePassword, queryToJSON } = require('./utils');
const { updateUsersData, createNewUser, validUser } = require('./users')
const { setContentPath, getContent } = require('./content')

updateUsersData({dbpath: './fakedatabases/users.json'});
setContentPath('./fakedatabases/content.json')

const GET = (req, res) => {
    const urlParts = req.url.split('?');
    const url = urlParts[0];
    const query = queryToJSON(urlParts[1]);
    const file = url.match(/[^\/]+\.[^\.]+/g);
    const page = url.match(/[^\/]+$/g);
    if(url === '/') {
        readFile('./pages/index.html', 'utf-8', (err, html) => {
            if(err) {
                res.statusCode = 500;
            } else {
                res.write(html);
            }
            res.end();
        }); 
    } else if (file) { 
        readFile('./static/' + file, 'utf-8', (err, file) => {
            if(err) {
                res.statusCode = 404;
            } else {
                res.write(file);
            }
            res.end();
        });
    } else if (page) {
        if(page == 'products') {
            res.write(getContent());
            res.end();
        } else {
            readFile('./pages/' + page + '.html', 'utf-8', (err, html) => {
                if(err) {
                    res.statusCode = 404;
                } else {
                    res.write(html);
                }
                res.end();
            });
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
}

const POST = (req, res) => {
    const urlParts = req.url.split('?');
    const url = urlParts[0];
    const query = queryToJSON(urlParts[1]);
    const file = url.match(/[^\/]+\.[^\.]+/g);
    const page = url.match(/[^\/]+$/g);
    const data = [];
    req.on('data', (chunk) => {
        data.push(chunk);
    });
    req.on('end', () => {
        const body = queryToJSON(Buffer.concat(data).toString());
        if(page == 'login') {
            if(validUser(body.user, body.password)) {
                res.write('<script defer>location.replace("/shop")</script>');
            } else 
                res.write('<script defer>location.replace("/login?attempt=fail")</script>');
            res.end();

        } else if (page == 'signup') {
            const pass = (body.password === body.confirmPass)? body.password : null;
            if(body.user && validatePassword(pass)) {
                createNewUser(body.user, body.password, (err) => {
                    if(err) {
                        res.write('<script defer>location.replace("/signup?attempt=badUser")</script>');
                    } else {
                        res.write('<script defer>location.replace("/shop")</script>');
                    }
                    res.end();
                });
            } else {
                res.write('<script defer>location.replace("/signup?attempt=fail")</script>')
                res.end();
            }
        } else if (file) {
            res.statusCode = 404;
            res.end();
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
}

http.createServer((req, res) => {
    if(req.method === 'GET') GET(req, res);
    else if(req.method === 'POST') POST(req, res);
    else {
        res.statusCode = 500;
        res.end();
    }
    
}).listen(3000, () => {console.log('Escuchando en http://localhost:3000');});