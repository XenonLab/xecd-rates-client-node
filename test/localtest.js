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

var localtestAll = function() {
    console.log("\n--ACCOUNT INFO--\n");
    localtestaccountInfo();
    console.log("\n--CURRENCIES--\n");
    localtestcurrencies();
    console.log("\n--CONVERT FROM--\n");
    localtestconvertFrom();
    console.log("\n--CONVERT TO--\n");
    localtestconvertTo();
    console.log("\n--HISTORIC RATE--\n");
    localtesthistoricRate();
    console.log("\n--HISTORIC RATE PERIOD--\n");
    localtesthistoricRatePeriod();
    console.log("\n--MONTHLY AVERAGE--\n");
    localtestmonthlyAverage();
}

var localtestaccountInfo = function() {
    async.auto({
        getRates: function(callback) {
            xecdinit.accountInfo(callback)
        }
    }, function (err, results){
        if(err) {
            console.log("Error Local Test")
        }
        console.log(results.getRates)
        return
    })
}

var localtestcurrencies = function() {
    async.auto({
        getRates: function(callback) {
            xecdinit.currencies(callback)
        },
    }, function (err, results){
        if(err) {
            console.log("Error Local Test")
        }
        console.log(results.getRates)
        return
    })
}

var localtestconvertFrom = function() {
        var from = "EUR";
        var to = "CAD";
        var amount = "80";
        async.auto({
            getRates: function(callback) {
                xecdinit.convertFrom(callback, from, to, amount)
            },
        }, function (err, results){
            if(err) {
                console.log("Error Local Test")
            }
            console.log(results.getRates)
            return
        })
}


var localtestconvertTo = function() {
        var to = "CAD";
        var from = "EUR";
        var amount = "200";
        async.auto({
            getRates: function(callback) {
                xecdinit.convertTo(callback, to, from, amount)
            },
        }, function (err, results){
            if(err) {
                console.log("Error Local Test")
            }
            console.log(results.getRates)
            return
        })
}

var localtesthistoricRate = function() {
        var amount = "55"
        var from = "EUR";
        var to = "CAD";
        var date = "2016-11-11";
        var time = "04:04";
        async.auto({
            getRates: function(callback) {
                xecdinit.historicRate(callback, amount, from, to, date, time)
            },
        }, function (err, results){
            if(err) {
                console.log("Error Local Test")
            }
            console.log(results.getRates)
            return
        })
}

var localtesthistoricRatePeriod = function() {
        var amount = "55"
        var from = "EUR";
        var to = "CAD";
        var start_timestamp = "2017-02-11T12:00";
        var end_timestamp = "2017-06-12T12:00";
        async.auto({
            getRates: function(callback) {
                xecdinit.historicRatePeriod(callback, amount, from, to, start_timestamp, end_timestamp)
            },
        }, function (err, results){
            if(err) {
                console.log("Error Local Test")
            }
            console.log(results.getRates)
            return
        })
}

var localtestmonthlyAverage = function() {
        var amount = "55"
        var from = "EUR";
        var to = "CAD";
        var year = "2017";
        var month = "4";
        async.auto({
            getRates: function(callback) {
                xecdinit.monthlyAverage(callback, amount, from, to, year, month)
            },
        }, function (err, results){
            if(err) {
                console.log("Error Local Test")
            }
            console.log(results.getRates)
            return
        })
}

module.exports.localtestAll = localtestAll
module.exports.localtestaccountInfo = localtestaccountInfo
module.exports.localtestcurrencies = localtestcurrencies
module.exports.localtestconvertFrom = localtestconvertFrom
module.exports.localtestconvertTo = localtestconvertTo
module.exports.localtesthistoricRate = localtesthistoricRate
module.exports.localtesthistoricRatePeriod = localtesthistoricRatePeriod
module.exports.localtestmonthlyAverage = localtestmonthlyAverage