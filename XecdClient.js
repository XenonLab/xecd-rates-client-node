var request = require('request');
var base64 = require('base-64'); 
var utf8 = require('utf8');

class XecdClient {
  constructor(accountId, apiKey, options = {}) {
    this.options = Object.assign({}, {
        'auth': {
          'user': accountId,
          'password': apiKey  
        },
        'baseUrl': 'https://xecdapi.xe.com/v1/'
    },options);
    this.request = request.defaults(this.options);

    this.accountInfoRequestUri = 'account_info.json';
    this.currenciesRequestUri = 'currencies.json';
    this.convertFromRequestUri = 'convert_from.json';
    this.convertToRequestUri = 'convert_to.json';
    this.historicRateRequestUri = 'historic_rate.json';
    this.historicRatePeriodRequestUri = 'historic_rate/period.json';
    this.monthlyAverageRequestUri = 'monthly_average.json';
  }

  send(ops, callback) {
    var self = this;
    self.options = Object.assign({}, self.options, ops);
    request.get(self.options, function(err, res, body) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        var data = JSON.parse(body);
        callback(null, data);
      }
    })
  }

  accountInfo(callback) {
    var self = this;
    var ops = {
        uri: self.accountInfoRequestUri
    };
    this.send(ops, callback);
  }

  currencies(callback, obsolete = false, language = "en", iso = ['*']) {
    var self = this;
    var ops = {
        uri: self.currenciesRequestUri,
        qs: {
            obsolete: obsolete ? true : false,
            language: language,
            iso: iso.join() //format: abc,def,ghi
        }
    };
    this.send(ops, callback);
  }

  convertFrom(callback, from = "USD", to = "*" , amount = 1, obsolete = false, inverse = false) {
    var self = this;
    var ops = {
        uri: self.convertFromRequestUri,
        qs: {
            from: from,
            to: to,
            amount: amount,
            obsolete: obsolete ? true : false,
            inverse: inverse ? true : false
        }
    };
    this.send(ops, callback);
  }

  convertTo(callback, to = "USD", from = "*", amount = 1, obsolete = false, inverse = false) {
    var self = this;
    var ops = {
        uri: self.convertToRequestUri,
        qs: {
            to: to,
            from: from,
            amount: amount,
            obsolete: obsolete ? true : false,
            inverse: inverse ? true : false
        }
    };
    this.send(ops, callback);
  }

  historicRate(callback, amount = 1, from = "USD" , to = "*", date, time, obsolete = false, inverse = false) {
    var self = this;
    var ops = {
        uri: self.historicRateRequestUri,
        qs: {
            from: from,
            to: to,
            amount: amount,
            date: date,
            time: time,
            obsolete: obsolete ? true : false,
            inverse: inverse ? true : false
        }
    };
    this.send(ops, callback);
  }

  historicRatePeriod(callback, amount = 1, from = "USD", to = "*", start_timestamp = null, end_timestamp = null, interval = "DAILY", obsolete = false, inverse = false, page = 1, per_page = 30) {
    var self = this;
    var ops = {
        uri: self.historicRatePeriodRequestUri,
        qs: {
            from: from,
            to: to,
            amount: amount,
            start_timestamp: start_timestamp ? start_timestamp : null,
            end_timestamp: end_timestamp ? end_timestamp : null,
            interval: interval,
            obsolete: obsolete ? true : false,
            inverse: inverse ? true : false,
            page: page,
            per_page: per_page
        }
    };
    this.send(ops, callback);
  }

  monthlyAverage(callback, amount = 1, from = "USD", to = "*", year = null, month = null, obsolete = false, inverse = false) {
    var self = this;
    var ops = {
        uri: self.monthlyAverageRequestUri,
        qs: {
            from: from,
            to: to,
            amount: amount,
            year: year,
            month: month,
            obsolete: obsolete ? true : false,
            inverse: inverse ? true : false
        }
    };
    this.send(ops, callback);
  }
}

module.exports.XecdClient = XecdClient;
