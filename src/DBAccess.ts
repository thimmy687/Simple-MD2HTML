const MongoClient = require('mongodb').MongoClient;
const ps = require(__dirname + '\\MDReplacer.js');

export class DBAccess {
    private _parser = new ps.MDReplacer();
    private _database;
    constructor(connectionStr: string) {
        //database setup
        MongoClient.connect(connectionStr, (err, db) => {
            // start the server
            if (err) return console.log(err);
            this._database = db;
        });
    }

    getAllInputs(): string {
        var res = "";
        this._database.collection('inputs').find().toArray((err, result) => {
            if (err) {
                console.log('DBAccess:::' + err)
                res = "500";
            }
            if (result) {
                res = result;
            }

        });
        return res;
    }

    addNewInput(itemToAdd: any): void {
        var parsedText = this._parser.replace(itemToAdd.input + '');
        var toSave =
            {
                name: itemToAdd.name,
                input: itemToAdd.input,
                output: parsedText
            }
        this._database.collection('inputs').save(toSave, (err, result) => {
            let res = "";
            if (err) {
                console.log(err);
                res = "500";
            };
            if (result) {
                console.log('saved to database');

                this._database.collection('inputs').find().toArray((err, resu) => {
                    if (err) return console.log(err);
                    for (var i = 0; i < 1000; i++) {
                        var element = 1000;                     
                    }
                    if (resu) {
                        console.log('DEBUG'+ resu);
                        res = resu; 
                    }
                });
            }
            console.log(res);
            return res;
        });
    }

    deleteAll(): any {
        this._database.collection('inputs').drop((err, result) => {
            if (err) {
                console.log(err);
                return 500;
            }
            console.log("history clean!")
            return 200;
        });
    }
}