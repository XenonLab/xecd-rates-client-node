class XecdClient {
  constructor(accountId, apiKey, options = {}) {
    this.options = Object.assign({}, {
        'auth': {
          'user': accountId,
          'password': apiKey  
        },
        'baseUrl': 'https://xecdapi.xe.com/v1/'
    });
    this.request = require('request').defaults(this.options);

    this.accountInfoRequestUri = 'account_info.json';
    this.currenciesRequestUri = 'currencies.json';
    this.convertFromRequestUri = 'convert_from.json';
    this.convertToRequestUri = 'convert_to.json';
    this.historicRateRequestUri = 'historic_rate.json';
    this.historicRatePeriodRequestUri = 'historic_rate/period.json';
    this.monthlyAverageRequestUri = 'monthly_average.json';
  }

  send(options, callback) {
    this.request.get(options, function(err, res, body) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        var data = JSON.parse(body);
        callback(null, data);
      }
    })
  }

  accountInfo(callback, options = {}) {
    this.send(Object.assign({}, {
      uri: this.accountInfoRequestUri
    }, options), callback);
  }

  currencies(callback, obsolete = false, language = "en", iso = ['*'], options = {}) {
    this.send(Object.assign({}, {
      uri: this.currenciesRequestUri,
      qs: {
          obsolete: obsolete ? true : false,
          language: language,
          iso: iso.join() //format: abc,def,ghi
      }
    }, options), callback);
  }

  convertFrom(callback, from = "USD", to = "*" , amount = 1, obsolete = false, inverse = false, options = {}) {
    this.send(Object.assign({}, {
      uri: this.convertFromRequestUri,
      qs: {
          from: from,
          to: to,
          amount: amount,
          obsolete: obsolete ? true : false,
          inverse: inverse ? true : false
      }
    }, options), callback);
  }

  convertTo(callback, to = "USD", from = "*", amount = 1, obsolete = false, inverse = false, options = {}) {
    this.send(Object.assign({}, {
      uri: this.convertToRequestUri,
      qs: {
          to: to,
          from: from,
          amount: amount,
          obsolete: obsolete ? true : false,
          inverse: inverse ? true : false
      }
    }, options), callback);
  }

  historicRate(callback, amount = 1, from = "USD" , to = "*", date, time, obsolete = false, inverse = false, options = {}) {
    this.send(Object.assign({}, {
      uri: this.historicRateRequestUri,
      qs: {
          from: from,
          to: to,
          amount: amount,
          date: date,
          time: time,
          obsolete: obsolete ? true : false,
          inverse: inverse ? true : false
      }
    }, options), callback);
  }

  historicRatePeriod(callback, amount = 1, from = "USD", to = "*", start_timestamp = null, end_timestamp = null, interval = "DAILY", obsolete = false, inverse = false, page = 1, per_page = 30, options = {}) {
    this.send(Object.assign({}, {
      uri: this.historicRatePeriodRequestUri,
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
  }, options), callback);
  }

  monthlyAverage(callback, amount = 1, from = "USD", to = "*", year = null, month = null, obsolete = false, inverse = false, options = {}) {
    this.send(Object.assign({}, {
      uri: this.monthlyAverageRequestUri,
      qs: {
          from: from,
          to: to,
          amount: amount,
          year: year,
          month: month,
          obsolete: obsolete ? true : false,
          inverse: inverse ? true : false
      }
    }, options), callback);
  }
}

module.exports.XecdClient = XecdClient;
