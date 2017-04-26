var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var ps = require(__dirname + '\\MDReplacer.js');
var path = require('path');
//member
var db;
var parser = new ps.MDReplacer();
// make public folder accessible to public
app.use(express.static(path.resolve('./public')));
app.use("/css", express.static(path.resolve('./public/css')));
app.use("/js", express.static(path.resolve('./public/js')));
//database setup
MongoClient.connect('mongodb://dbuser:dbpassword@ds115131.mlab.com:15131/mongo-test-db', function (err, database) {
    // start the server
    if (err)
        return console.log('DB-CONNECTION-ERR: ' + err);
    db = database;
    // set port to listen
    app.listen(process.env.PORT || 3000, function () {
        console.log('listening on 3000');
    });
    //clean history on startup
    db.collection('inputs').drop(function (err, result) {
        if (err)
            return console.log('WARN:' + err);
        console.log("INFO: history clean!");
    });
});
// middleware 
app.set('view engine', 'ejs');
// body-parser extracts the data from the form element and 
// add them to the body property in the request object
app.use(bodyParser.urlencoded({ extended: true }));
//let server read json data
app.use(bodyParser.json());
// routing
app.get('/', function (req, res) {
    db.collection('inputs').find().toArray(function (err, result) {
        if (err)
            return console.log(err);
        if (result === null) {
            result = "test";
        }
        res.render('index.ejs', { inputs: result });
    });
});
app.post('/inputs', function (req, res) {
    var parsedText = parser.replace(req.body.input + '');
    var toSave = {
        name: req.body.name,
        input: req.body.input,
        output: parsedText
    };
    var history;
    db.collection('inputs').save(toSave, function (err, result) {
        if (err)
            return console.log('SAVE-DB-ERR:' + err);
        console.log('INFO: saved to database');
        db.collection('inputs').find().toArray(function (err, result) {
            if (err)
                return console.log('FIND-ON-DB-ERR: ' + err);
            history = result;
            res.setHeader('Content-Type', 'application/json');
            res.redirect('/');
        });
    });
});
app.put('/inputs', function (req, res) {
    db.collection('inputs')
        .findOneAndUpdate({ name: 'input' }, {
        $set: {
            name: req.body.name,
            input: req.body.input,
            output: req.body.output
        }
    }, {
        sort: { _id: -1 },
        upsert: true
    }, function (err, result) {
        if (err)
            return res.send(err);
        res.send(result);
    });
});
app["delete"]('/inputs', function (req, res) {
    db.collection('inputs').drop(function (err, result) {
        if (err)
            return res.status(500).send(err);
        console.log("INFO: history clean!");
        res.status(200).send("INFO: history clean!");
    });
});
//# sourceMappingURL=server.js.map