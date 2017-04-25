var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var dbc = require(__dirname + '\\src\\DBAccess.js');
//member
var dbAccess;
// make public folder accessible to public
app.use(express.static(__dirname + '/public'));
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/js", express.static(__dirname + '/public/js'));
// set port to listen
app.listen(process.env.PORT || 3000, function () {
    dbAccess = new dbc.DBAccess('mongodb://dbuser:dbpassword@ds115131.mlab.com:15131/mongo-test-db');
    console.log('listening on 3000');
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
    var result = dbAccess.getAllInputs();
    if (result == "500") {
        res.status(500).redirect('/');
    }
    var json = JSON.stringify(result);
    console.log(json);
    res.render('index.ejs', { inputs: json });
});
app.post('/inputs', function (req, res) {
    var result = dbAccess.addNewInput(req.body);
    if (result == "500") {
        res.status(500).redirect('/');
    }
    var json = JSON.stringify(result);
    console.log(json);
    res.render('index.ejs', { inputs: json });
});
app["delete"]('/inputs', function (req, res) {
    var result = dbAccess.deleteAll();
    if (result == 200)
        return res.status(200).send('Input deleted');
    res.status(500).send('Unexpected error!');
});
//# sourceMappingURL=server.js.map