/**
 * {express} minimal and flexible Node.js web application framework 
 * that provides a robust set of features for web and mobile applications.
 */
const express = require('express');
/**
 * {bodyParser} Parse incoming request bodies in a middleware 
 * before your handlers, available under the req.body property.
 */
const bodyParser = require('body-parser');
/**
 * {app} instance of express
 */
const app = express();
/**
 * {MongoClient} client for database connection
 */
const MongoClient = require('mongodb').MongoClient;
/**
 * {path} framework to resolve paths
 */
const path = require('path');
/**
 * {MDReplacer} MDReplacer instance
 */
const MDReplacer  = require('./MDReplacer');

//member
let db;
/**
 * instance of MDReplacer
 */
let parser = new MDReplacer.MDReplacer();

// make public folder accessible to public
app.use(express.static(path.resolve('./public')));
app.use("/css", express.static(path.resolve('./public/css')));
app.use("/js", express.static(path.resolve('./public/js')));

//database setup
MongoClient.connect('mongodb://dbuser:dbpassword@ds115131.mlab.com:15131/mongo-test-db', (err, database) => {
    // start the server
    if (err) return console.log('DB-CONNECTION-ERR: ' + err);
    db = database;
    // set port to listen
    app.listen(normalizePort(process.env.PORT || 3000), () => {
        console.log('listening on 3000');
    });

    //clean history on startup
    db.collection('inputs').drop((err, result) => {
        if (err) return console.log('WARN:' + err);
        console.log("INFO: history clean!")
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
app.get('/', (req, res) => {
    db.collection('inputs').find().toArray((err, result) => {
        if (err) return console.log(err);
        if (result === null) { result = "test"; }
        res.render('index.ejs', { inputs: result });
    });
});

app.post('/inputs', (req, res) => {
    var parsedText = parser.replace(req.body.input + '');
    var toSave =
        {
            name: req.body.name,
            input: req.body.input,
            output: parsedText
        }
    var history;

    db.collection('inputs').save(toSave, (err, result) => {
        if (err) return console.log('SAVE-DB-ERR:' + err);
        console.log('INFO: saved to database');
        db.collection('inputs').find().toArray((err, result) => {
            if (err) return console.log('FIND-ON-DB-ERR: ' + err);
            history = result;
            res.setHeader('Content-Type', 'application/json');
            res.redirect('/');
        });
    });
});

app.put('/inputs', (req, res) => {
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
        }, (err, result) => {
            if (err) return res.send(err)
            res.send(result)
        });
});

app.delete('/inputs', (req, res) => {
    db.collection('inputs').drop((err, result) => {
        if (err) return res.status(500).send(err);
        console.log("INFO: history clean!")
        res.status(200).send("INFO: history clean!")
    });
});



/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
