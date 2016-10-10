var express = require('express');
var mongodb = require('mongodb')
var app = express();

var mongodbURL = 
'mongodb://dbuser:1234@ds053156.mlab.com:53156/marcusbear0615';

var myDB
mongodb.MongoClient.connect(mongodbURL, function(err, db) {
if (err) {
console.log(err);
} else {
	myDB = db;
console.log('connection success');
}
});
app.get('/api/test', function(request, response) {
var collection = myDB.collection('my_data');
collection.find({}).toArray(function(err, docs) {
if (err) {
response.status(406).end();
} else {
response.type('application/json');
response.status(200).send(docs);
response.end();
}
});
})

app.get('/', function(request, response) {
response.status(200).send('<html><body><H1>Hello World</H1></body></html>');
response.end();
});
app.get('/api/test', function(request, response) {
var ret = {
msg : 'Hello World',
status : 0
}
response.status(200).send(JSON.stringify(ret));
response.end();
});
app.listen(5000);
