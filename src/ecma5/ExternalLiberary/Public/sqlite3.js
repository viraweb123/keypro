'use strict';

var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('user.db');
var check;
db.serialize(function () {

    db.run("CREATE TABLE if not exists USER (uid TEXT  PRIMARY KEY, firstName TEXT , lastName TEXT , age INT  )");
    var stmt = db.prepare("INSERT INTO USER(uid,firstName,lastName,age) VALUES (? , ? , ? ,?)");
    stmt.run(String(Date.parse(new Date())), "مهدی", "صالحی", 20);
    stmt.finalize();
    db.each("SELECT id AS uid,firstName AS firstName , lastName AS lastName , age AS age info FROM USER", function (err, row) {
        console.log('Name = ' + row.firstName + ' ' + row.lastName + ' , Age = ' + row.age);
    });

    db.run("DELETE * from USER where condition");
    db.run("UPDATE USER where condition");
});

db.close();

/* TODO sqLite TYPES
Each value stored in an SQLite database (or manipulated by the database engine) has one of the following storage classes:

    NULL. The value is a NULL value.

    INTEGER. The value is a signed integer, stored in 1, 2, 3, 4, 6, or 8 bytes depending on the magnitude of the value.

    REAL. The value is a floating point value, stored as an 8-byte IEEE floating point number.

    TEXT. The value is a text string, stored using the database encoding (UTF-8, UTF-16BE or UTF-16LE).

    BLOB. The value is a blob of data, stored exactly as it was input.
*/

/*
    CREATE TABLE t1(a INT, b VARCHAR(10));
    INSERT INTO t1(a,b) VALUES('123',456);
*/

var https = require('https');

var data = '';
var url = 'https://jsonplaceholder.typicode.com/todos';

var config = {
    hostname: '[hostname]',
    port: 443,
    method: 'GET',
    path: '/[rest endpoint]',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
};

var req = https.request(config, function (res) {

    res.on('data', function (d) {
        data += d;
    });

    res.on('end', function () {
        var json = JSON.parse(data);

        create_table(json);

        /*
         verify the data made it into the table
         */
        db.each('select rowid, title ' + 'from todo ' + 'order by rowid asc', function (err, row) {
            console.log(row.rowid + ': ' + row.title);
        });
    });
});
req.end();

/*
 Create the table and insert the values from each JSON object.
 */
function create_table(json) {

    // hard coding is cheating, mostly... make it dynamic!

    db.serialize(function () {
        db.run('create table if not exists ' + 'todo (' + 'id numeric primary key, ' + 'userid numeric, ' + 'title text, ' + 'completed text)');

        db.run('delete from todo'); //or drop the table first..

        var stmt = db.prepare('insert into todo values (?,?,?,?)');

        json.forEach(function (item) {
            stmt.run([item.id, item.userid, item.title, item.completed]);
        });

        stmt.finalize();
    });
}