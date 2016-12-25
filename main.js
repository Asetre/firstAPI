const express = require('express');
const app = express();
const cors = require('cors')

var statePrices = require('./app.js');
var provincePrices = require('./can.js');
var stateGasPrices;
var provinceGasPrices;

statePrices(callbackUsa);
provincePrices(callbackCanada);

function callbackUsa(info) {
	stateGasPrices = info;
}

function callbackCanada(info) {
	provinceGasPrices = info;
}

app.use(cors());
app.get('/USA', function(req, res) {
	res.json(stateGasPrices);
});

app.get('/CAN', function(req, res) {
	res.json(provinceGasPrices);

});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
