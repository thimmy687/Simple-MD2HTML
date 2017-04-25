"use strict";
exports.__esModule = true;
var MongoClient = require('mongodb').MongoClient;
var ps = require(__dirname + '\\MDReplacer.js');
var DBAccess = (function () {
    function DBAccess(connectionStr) {
        var _this = this;
        this._parser = new ps.MDReplacer();
        //database setup
        MongoClient.connect(connectionStr, function (err, db) {
            // start the server
            if (err)
                return console.log(err);
            _this._database = db;
        });
    }
    DBAccess.prototype.getAllInputs = function () {
        var res = "";
        this._database.collection('inputs').find().toArray(function (err, result) {
            if (err) {
                console.log('DBAccess:::' + err);
                res = "500";
            }
            if (result) {
                res = result;
            }
        });
        return res;
    };
    DBAccess.prototype.addNewInput = function (itemToAdd) {
        var _this = this;
        var parsedText = this._parser.replace(itemToAdd.input + '');
        var toSave = {
            name: itemToAdd.name,
            input: itemToAdd.input,
            output: parsedText
        };
        this._database.collection('inputs').save(toSave, function (err, result) {
            var res = "";
            if (err) {
                console.log(err);
                res = "500";
            }
            ;
            if (result) {
                console.log('saved to database');
                _this._database.collection('inputs').find().toArray(function (err, resu) {
                    if (err)
                        return console.log(err);
                    for (var i = 0; i < 1000; i++) {
                        var element = 1000;
                    }
                    if (resu) {
                        console.log('DEBUG' + resu);
                        res = resu;
                    }
                });
            }
            console.log(res);
            return res;
        });
    };
    DBAccess.prototype.deleteAll = function () {
        this._database.collection('inputs').drop(function (err, result) {
            if (err) {
                console.log(err);
                return 500;
            }
            console.log("history clean!");
            return 200;
        });
    };
    return DBAccess;
}());
exports.DBAccess = DBAccess;
//# sourceMappingURL=DBAccess.js.map