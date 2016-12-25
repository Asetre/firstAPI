var request = require('request'),
    cheerio = require('cheerio');

module.exports = function(cb) {
  request('http://www.gasbuddy.com/USA', callback);

  function callback(err, res, body) {
    if (!err && res.statusCode === 200) {
      var $ = cheerio.load(body);
      var usGasPrice = $('.col-xs-3.text-right', '#searchItems')
        .text()
        .split(/[\s\r?\n]+/g)
        .filter(function (entry) {
          if (entry) return entry
        })
      var stateName = $('.siteName', '#searchItems')
        .text()
        .split(/[\r?\n]+/g)
        .map(state => {
          return state.replace(/^\s+|\s+$/g, '')
        })
        .filter(state => {
          if (state) return state
        })

        var gasPricesByState = combineArray(usGasPrice, stateName);
        cb(gasPricesByState);
    }
  }


  function combineArray(gasPrices, stateNames) {
    var results = {}
    stateNames.forEach(function (state, i) {
      results[state] = gasPrices[i]
    })
    return results
  }
}


















