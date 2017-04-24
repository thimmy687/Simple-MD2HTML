const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ps = require(__dirname+ '\\src\\MDReplacer.js');
//member
var db;

var parser = new ps.MDReplacer();

// make public folder accessible to public
app.use(express.static(__dirname +'/public'));
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/js", express.static(__dirname + '/public/js'));

//database setup
MongoClient.connect('mongodb://dbuser:dbpassword@ds115131.mlab.com:15131/mongo-test-db', (err,database)=>{
    // start the server
    if(err)return console.log(err);
    db = database;
    // set port to listen
    app.listen(process.env.PORT || 3000, ()=>{
        console.log('listening on 3000');
    });
});

// middleware 
app.set('view engine', 'ejs');

// body-parser extracts the data from the form element and 
// add them to the body property in the request object
app.use(bodyParser.urlencoded({extended: true}));

//let server read json data
app.use(bodyParser.json());

// routing
app.get('/', (req, res)=>{
    db.collection('inputs').find().toArray((err, result)=>{
        if(err) return console.log(err);
        if(result === null){ result = "test";}
        res.render('index.ejs', {inputs: result});    
    });
});

app.post('/inputs', (req, res)=>{
    var parsedText = parser.replace(req.body.input+'');    
    var toSave = 
        {
            name: req.body.name,
            input: req.body.input,
            output: parsedText
        }
    var history;
 
    db.collection('inputs').save(toSave, (err,result)=>{
        if(err)return console.log(err);
        console.log('saved to database');
        db.collection('inputs').find().toArray((err,result)=>{
            if(err) return console.log(err);
            history = result;
            res.setHeader('Content-Type', 'application/json');
            res.redirect('/');
        });
    });
});

app.put('/inputs', (req, res) => {
  db.collection('inputs')
  .findOneAndUpdate({name: 'Input'}, {
    $set: {
      name: req.body.name,
      input: req.body.input,
      output: req.body.output
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  });
});

app.delete('/inputs', (req, res) => {
    db.collection('inputs').findOneAndDelete({name: req.body.name},(err, result) => {
        if (err) return res.send(500, err);
        console.log("delete something!")
        res.send('Input deleted')
    });
});
