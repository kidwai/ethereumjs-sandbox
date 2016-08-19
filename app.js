const HOST = "localhost";
const PORT = 8000;
var testrpc = require('ethereumjs-testrpc');
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send();
});

app.post('/testrpc', (req, res) => {
    testrpc.server().listen(8545, () => {
        res.send();
    });
});

app.listen(PORT, HOST, () => {
	console.log("Server listening on http:\/\/%s:%s",HOST,PORT);
});