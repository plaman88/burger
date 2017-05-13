// ORM Functions into database commands

var connection = require('../config/connection.js');

//OBJECT RELATIONAL MAPPER (O.R.M)
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push('?');
    }

    return arr.toString();
}

function objToSql(ob) {
    //Column Values
    var arr = [];

    for (var key in ob) {
        if (ob.hasOwnProperty(key)) {
            arr.push(key + '=' +  ob[key]);
        }
    }

    return arr.toString();
}

var orm = {
    all: function(tableInput, cb) {
        var queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, function(err, result) {
                if (err) throw err;
                cb(result);
        });
    },

    create: function(table, cols, vals, cb) {
        console.log(vals);
        var queryString = 'INSERT INTO ' + table;

        queryString = queryString + ' (';
        queryString = queryString + cols.toString();
        queryString = queryString + ') ';
        queryString = queryString + 'VALUES (';
        queryString = queryString + printQuestionMarks(vals.length);
        queryString = queryString + ') ';

        console.log('\nQuery:', queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    devour: function(table, objColVals, condition, cb) {
        var queryString = 'UPDATE ' + table;

        queryString = queryString + ' SET ';
        queryString = queryString + objToSql(objColVals);
        queryString = queryString + ' WHERE ';
        queryString = queryString + condition;

        console.log('\nQuery:', queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });

    },

    clear: function(table, condition, cb) {
        var queryString = 'DELETE FROM ' + table;

        queryString = queryString + ' WHERE ';
        queryString = queryString + condition;

        console.log('\nQuery:', queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }   
};

module.exports = orm;
