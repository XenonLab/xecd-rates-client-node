var request = require('request');
var base64 = require('base-64'); 
var utf8 = require('utf8');

class XecdClient {
  constructor(config) {
    if(config.username == 'insert here' || config.username == null || config.password == 'AKA api key'  ||  config.password == null) {
      throw new Error('username/password still placeholder');
    }
    this.config = config;
  }

  send(urlEnd, qs, callback) {
    var self = this;
    var options = {
      url: self.config.apiUrl + urlEnd,
      auth: {
        user: self.config.username,
        password: self.config.password
      },
      qs: qs
    }
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
    this.send('account_info.json', {}, callback);
  }

  currencies(callback, obsolete = false, language = "en", iso = ['*']) {
    var qs = {
      obsolete: obsolete ? true : false,
      language: language,
      iso: iso.join() //format: abc,def,ghi
    }
    this.send('currencies.json', qs, callback);
  }

  convertFrom(callback, from = "USD", to = "*" , amount = 1, obsolete = false, inverse = false) {
    var qs = {
      from: from,
      to: to,
      amount: amount,
      obsolete: obsolete ? true : false,
      inverse: inverse ? true : false
    }
    this.send('convert_from.json', qs, callback);
  }

  convertTo(callback, to = "USD", from = "*", amount = 1, obsolete = false, inverse = false) {
    var qs = {
      to: to,
      from: from,
      amount: amount,
      obsolete: obsolete ? true : false,
      inverse: inverse ? true : false
    }
    this.send('convert_to.json', qs, callback);
  }

  historicRate(callback, amount = 1, from = "USD" , to = "*", date, time, obsolete = false, inverse = false) {
    var qs = {
      from: from,
      to: to,
      amount: amount,
      date: date,
      time: time,
      obsolete: obsolete ? true : false,
      inverse: inverse ? true : false
    }
    this.send('historic_rate.json', qs, callback);
  }

  historicRatePeriod(callback, amount = 1, from = "USD", to = "*", start_timestamp = null, end_timestamp = null, interval = "DAILY", obsolete = false, inverse = false, page = 1, per_page = 30) {
    var qs = {
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
    this.send('historic_rate/period.json', qs, callback);
  }

  monthlyAverage(callback, amount = 1, from = "USD", to = "*", year = null, month = null, obsolete = false, inverse = false) {
    var qs = {
      from: from,
      to: to,
      amount: amount,
      year: year,
      month: month,
      obsolete: obsolete ? true : false,
      inverse: inverse ? true : false
    }
    this.send('monthly_average.json', qs, callback);
  }
}

module.exports.XecdClient = XecdClient;
