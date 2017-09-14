var request = require('request');
var base64 = require('base-64'); 
var utf8 = require('utf8');

var config = null;

function XECD(XECDConfig) {
    this.config = XECDConfig;
    if(XECDConfig.username == 'insert here' || XECDConfig.username == null || XECDConfig.password == 'AKA api key'  ||  XECDConfig.password == null) {
      throw new Error('username/password still placeholder');
      process.exit(1);
    }
}

XECD.prototype.accountInfo = function (callback) {  //should be no params
  var self = this;
  var url = self.config.apiUrl + 'account_info.json';

  var options = {
    url: url,
    auth: {
      user: self.config.username,
      password: self.config.password
    },
    qs: {
      //should be no parameters
    }
  }
  request.get(options, function (err, res, body) {
    if (err) {
      logger.error(err);
      callback(err, null);
    } else {
      var data = JSON.parse(body);
      callback(null, data);
    }
  })
}

XECD.prototype.currencies = function (callback, obsolete = "false", language = "en", iso = ['*']) {
  var self = this;
  var url = self.config.apiUrl + 'currencies.json';

  var options = {
    url: url,
    auth: {
      user: self.config.username,
      password: self.config.password
    },
    qs: {
      obsolete: obsolete ? true : false,
      language: language,
      iso: iso.join() //format: abc,def,ghi
    }
  }
  request.get(options, function (err, res, body) {
    if (err) {
      logger.error(err);
      callback(err, null);
    } else {
      var data = JSON.parse(body);
      callback(null, data);
    }
  })
}

XECD.prototype.convertFrom = function (callback, from = "USD", to = "*" , amount = 1, obsolete = "false", inverse = "false") {
  var self = this;
  var url = self.config.apiUrl + 'convert_from.json';

  var options = {
    url: url,
    auth: {
      user: self.config.username,
      password: self.config.password
    },
    qs: {
      from: from,
      to: to,
      amount: amount,
      obsolete: obsolete ? true : false,
      inverse: inverse ? true : false
    }
  };
  request.get(options, function (err, res, body) {
    if (err) {
      logger.error(err);
      callback(err, null);
    } else {
      var data = JSON.parse(body);
      callback(null, data);
    }
  })
}

XECD.prototype.convertTo = function (callback, to = "USD", from = "*", amount = 1, obsolete = "false", inverse = "false") {
  var self = this;
  var url = self.config.apiUrl + 'convert_to.json';

  var options = {
    url: url,
    auth: {
      user: self.config.username,
      password: self.config.password
    },
    qs: {
      to: to,
      from: from,
      amount: amount,
      obsolete: obsolete ? true : false,
      inverse: inverse ? true : false
    }
  };
  request.get(options, function (err, res, body) {
    if (err) {
      logger.error(err);
      callback(err, null);
    } else {
      var data = JSON.parse(body);
      callback(null, data);
    }
  })
}

XECD.prototype.historicRate = function (callback, amount = 1, from = "USD" , to = "*", date, time, obsolete = "false", inverse = "false") {
  var self = this;
  var url = self.config.apiUrl + 'historic_rate.json';
  
  var options = {
    url: url,
    auth: {
      user: self.config.username,
      password: self.config.password
    },
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
  request.get(options, function (err, res, body) {
    if (err) {
      logger.error(err);
      callback(err, null);
    } else {
      var data = JSON.parse(body);
      callback(null, data);
    }
  })
}

XECD.prototype.historicRatePeriod = function (callback, amount = 1, from = "USD", to = "*", start_timestamp = null, end_timestamp = null, interval = "DAILY", obsolete = false, inverse = false, page = 1, per_page = 30) {
  var self = this;
  var url = self.config.apiUrl + 'historic_rate/period.json';
  
  var options = {
    url: url,
    auth: {
      user: self.config.username,
      password: self.config.password
    },
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
  request.get(options, function (err, res, body) {
    if (err) {
      logger.error(err);
      callback(err, null);
    } else {
      var data = JSON.parse(body);
      callback(null, data);
    }
  })
}

XECD.prototype.monthlyAverage = function (callback, amount = 1, from = "USD", to = "*", year = null, month = null, obsolete = "false", inverse = "false") {
  var self = this;
  var url = self.config.apiUrl + 'monthly_average.json';
  
  var options = {
    url: url,
    auth: {
      user: self.config.username,
      password: self.config.password
    },
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
  request.get(options, function (err, res, body) {
    if (err) {
      logger.error(err);
      callback(err, null);
    } else {
      var data = JSON.parse(body);
      callback(null, data);
    }
  })
}

module.exports.XECD = XECD