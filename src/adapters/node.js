// Generated by CoffeeScript 1.9.3
(function() {
    var request = require('request');
    var mkFhir = require('../fhir');
    var utils = require('../utils');

    var adapter = {
        http: function(q) {
            q.headers = q.headers || {};
            q.headers["Accept"] = "application/json";
            q.headers["Content-Type"] = "application/json";
            q.body = q.data;
            q.json = true;
            return request(q, function(err, response, body) {
                var headers;
                headers = function(x) {
                    return response.headers[x.toLowerCase()];
                };
                if (err) {
                    return q.error(err, response.statusCode, headers, q);
                } else if (response.statusCode > 399) {
                    return q.error(body, response.statusCode, headers, q);
                } else {
                    return q.success(body, response.statusCode, headers, q);
                }
            });
        }
    };

    var wrappToErrbackForm = function(fn) {
        return function(args, cb) {
            if(cb){
                args.callback = cb;
                args.success = function(res, status, headersFn, query) {
                    return cb(null, res, status, headersFn, query);
                };
                args.error = function(err, status, headersFn, query) {
                    return cb(err, null, status, headersFn, query);
                };
            }
            return fn(args);
        };
    };

    module.exports = function(config) {
        var fhir = mkFhir(config, adapter);
        var wrp = {};
        for(var k in fhir){wrp[k] = wrappToErrbackForm(fhir[k]); }
        return wrp;
    };

}).call(this);
