var request = require('request');
var base64 = require('base-64'); 
var utf8 = require('utf8');

class XecdClient {
  constructor(config) {
    this.config = config;
  }

  send(ops, callback) {
    var self = this;
    var options = ops;
    options['auth'] =  {
        user: self.config.accountId,
        password: self.config.apiKey
    };
    request.get(options, function(err, res, body) {
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
        url: self.config.apiUrl + "account_info.json",
        qs: {}  //no variables
    };
    this.send(ops, callback);
  }

  currencies(callback, obsolete = false, language = "en", iso = ['*']) {
    var self = this;
    var ops = {
        url: self.config.apiUrl + 'currencies.json',
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
        url: self.config.apiUrl + 'convert_from.json',
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
        url: self.config.apiUrl + 'convert_to.json',
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
        url: self.config.apiUrl + 'historic_rate.json',
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
        url: self.config.apiUrl + 'historic_rate/period.json',
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
        url: self.config.apiUrl + 'monthly_average.json',
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
