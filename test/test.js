var chai = require('chai').assert;
var index = require('../index');
var async = require('async');
var logger = require('winston');

var XECDConfig = {
    username: 'insert here',    //mandatory
    password: 'AKA api key',    //mandatory
    apiUrl: 'https://xecdapi.xe.com/v1/'
};

var xecdinit = new index.XECD(XECDConfig);

describe("XECD Rates API, Node Client", function() {
  describe("accountInfo", function() {
    it("Checking Request and Response", function() {
        //no vars
      async.auto({
            getRates: function(callback) {
                xecdinit.accountInfo()
            },
            test: ['getRates', function(callback, results) {
                chai.isNotNull(results.getrates);
            }]
        }, function (err, results){
            if(err) {
                logger.error("Test Failed");
            }
            return
        });
    });
  });
  describe("currencies", function() {
    it("Checking Request and Response", function() {
        //no vars
      async.auto({
            getRates: function(callback) {
                xecdinit.currencies()
            },
            test: ['getRates', function(callback, results) {
                chai.isNotNull(results.getrates);
            }]
        }, function (err, results){
            if(err) {
                logger.error("Test Failed");
            }
            return
        });
    });
  });
  describe("convertFrom", function() {
    it("Checking Request and Response", function() {
        var from = "EUR";
        var to = "CAD";
        var amount = "80";
      async.auto({
            getrates: function(callback) {
                xecdinit.convertFrom(from, to, amount, callback)
            },
            test: ['getrates', function(callback, results) {
                chai.isNotNull(results.getrates);
            }]
        }, function (err, results){
            if(err) {
                logger.error("Test Failed");
            }
            return 
        });
    });
  });
  describe("convertTo", function() {
    it("Checking Request and Response", function() {
        var to = "CAD";
        var from = "EUR";
        var amount = "200";
      async.auto({
            getrates: function(callback) {
                xecdinit.convertTo(to, from, amount, callback)
            },
            test: ['getrates', function(callback, results) {
                chai.isNotNull(results.getrates);
            }]
        }, function (err, results){
            if(err) {
                logger.error("Test Failed");
            }
            return 
        });
    });
  });
  describe("historicRate", function() {
    it("Checking Request and Response", function() {
        var amount = "55"
        var from = "EUR";
        var to = "CAD";
        var date = "2016-02-02";
        var time = "04:04";
      async.auto({
            getrates: function(callback) {
                xecdinit.historicRate(amount, from, to, date, time, callback)
            },
            test: ['getrates', function(callback, results) {
                chai.isNotNull(results.getrates);
            }]
        }, function (err, results){
            if(err) {
                logger.error("Test Failed");
            }
            return 
        });
    });
  });
  describe("historicRatePeriod", function() {
    it("Checking Request and Response", function() {
        var amount = "55"
        var from = "EUR";
        var to = "CAD";
        var start_timestamp = "2011-02-11T12:00";
        var end_timestamp = "2011-06-92T12:00";
      async.auto({
            getrates: function(callback) {
                xecdinit.historicRatePeriod(amount, from, to, start_timestamp, end_timestamp, callback)
            },
            test: ['getrates', function(callback, results) {
                chai.isNotNull(results.getrates);
            }]
        }, function (err, results){
            if(err) {
                logger.error("Test Failed");
            }
            return 
        });
    });
  });
  describe("monthlyAverage", function() {
    it("Checking Request and Response", function() {
        var amount = "55"
        var from = "EUR";
        var to = "CAD";
        var year = "2015";
        var month = "6";
      async.auto({
            getrates: function(callback) {
                xecdinit.monthlyAverage(amount, from, to, year, month, callback)
            },
            test: ['getrates', function(callback, results) {
                chai.isNotNull(results.getrates);
            }]
        }, function (err, results){
            if(err) {
                logger.error("Test Failed");
            }
            return 
        });
    });
  });
});