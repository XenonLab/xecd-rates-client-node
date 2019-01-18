//These tests actually call the api

var chai = require('chai').assert;
var client = require('../XecdClient');
var async = require('async');

var XecdClient = new client.XecdClient('accountId', 'apiKey');

describe('XECD Node Client Integration Tests', () => {
    it("accountInfo", function() {
        async.auto({
            getInfo: function(callback) {
                XecdClient.accountInfo(callback);
            },
            test: ['getInfo', function(callback, result) {
                chai.isNotNull(result.getInfo);
            }]
        }, function (err, result){
            if(err) {
                console.log("Error Local Test");
            }
            return
        });
    });

    it("currencies", function() {
        async.auto({
            getInfo: function(callback) {
                XecdClient.currencies(callback);
            },
            test: ['getInfo', function(callback, result) {
                chai.isNotNull(result.getInfo);
            }]
        }, function (err, result){
            if(err) {
                console.log("Error Local Test");
            }
            return
        });
    });

    it("convertFrom", function() {
        var from = "EUR";
        var to = "CAD";
        var amount = 55;

        async.auto({
            getInfo: function(callback) {
                XecdClient.convertFrom(callback, from, to, amount);
            },
            test: ['getInfo', function(callback, result) {
                chai.isNotNull(result.getInfo);
            }]
        }, function (err, result){
            if(err) {
                console.log("Error Local Test");
            }
            return
        });
    });

    it("convertTo", function() {
        var to = "RUB";
        var from = "USD"
        var amount = 55;

        async.auto({
            getInfo: function(callback) {
                XecdClient.convertTo(callback, to, from, amount);
            },
            test: ['getInfo', function(callback, result) {
                chai.isNotNull(result.getInfo);
            }]
        }, function (err, result){
            if(err) {
                console.log("Error Local Test");
            }
            return
        });
    });

    it("historicRate", function() {
        var amount = "55"
        var from = "EUR";
        var to = "CAD";
        var date = "2016-11-11";
        var time = "04:04";

        async.auto({
            getInfo: function(callback) {
                XecdClient.historicRate(callback, amount, from, to, date, time);
            },
            test: ['getInfo', function(callback, result) {
                chai.isNotNull(result.getInfo);
            }]
        }, function (err, result){
            if(err) {
                console.log("Error Local Test");
            }
            return
        });
    });

    it("historicRatePeriod", function() {
        var amount = "55"
        var from = "EUR";
        var to = "CAD";
        var start_timestamp = "2017-02-11T12:00";
        var end_timestamp = "2017-06-12T12:00";

        async.auto({
            getInfo: function(callback) {
                XecdClient.historicRatePeriod(callback, amount, from, to, start_timestamp, end_timestamp);
            },
            test: ['getInfo', function(callback, result) {
                chai.isNotNull(result.getInfo);
            }]
        }, function (err, result){
            if(err) {
                console.log("Error Local Test");
            }
            return
        });
    });

    it("monthlyAverage", function() {
        var amount = "55"
        var from = "EUR";
        var to = "CAD";
        var year = "2017";
        var month = "4";

        async.auto({
            getInfo: function(callback) {
                XecdClient.monthlyAverage(callback, amount, from, to, year, month);
            },
            test: ['getInfo', function(callback, result) {
                chai.isNotNull(result.getInfo);
            }]
        }, function (err, result){
            if(err) {
                console.log("Error Local Test");
            }
            return
        });
    });
});

