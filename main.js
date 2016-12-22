const express = require('express');
const app = express();

var statePrices = require('./app.js');
var stateGasPrices;

statePrices(callback);

function callback(info) {
	stateGasPrices = info;
}

app.get('/:state', function(req, res){
	var state = req.params.state;
	res.json(stateGasPrices[state]);
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});