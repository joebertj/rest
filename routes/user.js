
/*
 * GET users listing.
 */
//var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
//var url = 'mongodb://test:test@localhost:27017/users';
//var url = 'mongodb://nodejs:G8bYFxjx5d6iB7Y@ds121665.mlab.com:21665/users';
var url = 'mongodb+srv://nodejs:G8bYFxjx5d6iB7Y@cluster0-1kjkt.mongodb.net/users?retryWrites=true';

var findUsers = function(collection, callback) {
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
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
		assert.equal(null, err);
		const collection = client.db("users").collection("users");
		findUsers(collection, function(doc) {
			res.render("list",{title: 'Node.js + MongoDB + REST/CRUD/JSON', message: JSON.stringify(doc), jsonmsg: doc});
			});
		client.close();
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


var addUser = function(req, collection, callback) {
	req.body.id = Number(req.body.id);
	delete req.body.__proto__;
	collection.insert(req.body, function(err, doc) {
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
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
		assert.equal(null, err);
		const collection = client.db("users").collection("users");
		addUser(req, collection, function() {
			res.render('index', { title: 'Node.js + MongoDB + REST/CRUD/JSON', message: 'Record added' });
		});
		client.close();
	});
};

var findUserbyId = function(collection, id, callback) {
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


var deleteUser = function(collection, id, callback) {
	collection.remove( { "id" : Number(id) }, function(err, doc) {
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
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
		assert.equal(null, err);
		const collection = client.db("users").collection("users");
		deleteUser(collection, req.params.id, function() {
			res.end("Record deleted");
		});
		client.close();
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
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
		assert.equal(null, err);
		const collection = client.db("users").collection("users");
		findUserbyId(collection, req.params.id, function(str) {
			res.end(str);
		});
	});
};

var updateUserbyId = function(req, collection, callback) {
	req.body.id = Number(req.params.id);
	delete req.body.__proto__;
	collection.update( { "id" : Number(req.params.id) }, req.body, function(err, doc) {
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
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
		assert.equal(null, err);
		const collection = client.db("users").collection("users");
		updateUserbyId(req, collection, function() {
			res.end("Record updated");
		});
		client.close();
	});
};
