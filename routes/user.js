
/*
 * GET users listing.
 */
//var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
//var url = 'mongodb://test:test@localhost:27017/users';
var url = 'mongodb://nodejs:G8bYFxjx5d6iB7Y@ds121665.mlab.com:21665/users';

var findUsers = function(db, callback) {
	var collection = db.collection('users');
	var cursor = collection.find().toArray(function(err, doc) {
		assert.equal(err, null);
		callback(doc);
	});
};

exports.list = function(req, res){
	/*fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
		console.log( data );
		res.end( data );
	});*/
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		findUsers(db, function(doc) {
			res.render("list",{title: 'Node.js + MongoDB + REST/CRUD/JSON', message: JSON.stringify(doc), jsonmsg: doc});
			db.close(); });
	});
};

/*var user = {
		"user4" : {
			"name" : "mohit",
			"password" : "password4",
			"profession" : "teacher",
			"id": 4
		}
};*/


var addUser = function(req, db, callback) {
	req.body.id = Number(req.body.id);
	delete req.body.__proto__;
	db.collection('users').insert(req.body, function(err, doc) {
		assert.equal(err, null);
		callback();
	});
};

exports.add = function (req, res) {
	// First read existing users.
	/*fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
		data = JSON.parse( data );
		data.user4 = user.user4;
		console.log( data );
		res.end( JSON.stringify(data));
	});*/
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		addUser(req, db, function() {
			res.render('index', { title: 'Node.js + MongoDB + REST/CRUD/JSON', message: 'Record added' });
			db.close();
		});
	});
};

var findUserbyId = function(db, id, callback) {
	var collection = db.collection('users');
	var cursor = collection.find( { "id" : Number(id) } );
	var str = "";
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc !== null) {
			str += JSON.stringify(doc);
		} else {
			callback(str);
		}
	});
};


var deleteUser = function(db, id, callback) {
	db.collection('users').remove( { "id" : Number(id) }, function(err, doc) {
		assert.equal(err, null);
		callback();
	});
};

exports.del = function (req, res) {
	// First read existing users.
	/*fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
	data = JSON.parse( data );
	delete data["user" + req.params.id];

	console.log( data );
	res.end( JSON.stringify(data));
});*/
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		deleteUser(db, req.params.id, function() {
			res.end("Record deleted");
			db.close();
		});
	});
};

exports.id = function (req, res) {

	// First read existing users.
	/*fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
	var users = JSON.parse( data );
	var user = users["user" + req.params.id];
	console.log( user );
	res.end( JSON.stringify(user));
});*/
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		findUserbyId(db, req.params.id, function(str) {
			res.end(str);
			db.close();
		});
	});
};

var updateUserbyId = function(req, db, callback) {
	req.body.id = Number(req.params.id);
	delete req.body.__proto__;
	db.collection('users').update( { "id" : Number(req.params.id) }, req.body, function(err, doc) {
		assert.equal(err, null);
		callback();
	});
};

exports.update = function (req, res) {

	// First read existing users.
	/*fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
		data = JSON.parse( data );
		console.log(req.body);
		data["user" + req.params.id] = req.body;
		console.log( data );
		res.end( JSON.stringify(data));
	});*/
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		updateUserbyId(req, db, function() {
			res.end("Record updated");
			db.close();
		});
	});
};
