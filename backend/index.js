var express = require('express');
var http = require('http');
// var AWS = require('aws-sdk');
var dynamoose = require('dynamoose');

dynamoose.local();
dynamoose.AWS.config.update({
    accessKeyId: 'AKID',
    secretAccessKey: 'SECRET',
    region: 'us-east-1'
});

// Create cat model with default options
var Cat = dynamoose.model('Cat', { id: Number, name: String });

// Create a new cat object
var garfield = new Cat({ id: 666, name: 'Garfield' });

// Save to DynamoDB
garfield.save();

var app = express();

var router = express.Router();

router.get('/', (req, res) => {
    // Lookup Cat model and get cat with id: 666 in DynamoDB
    Cat.get(666)
        .then(function(badCat) {
            res.send('Never trust a smiling cat. - ' + badCat.name);
        }).catch(error => {
            res.send(error);
        });
})

app.use('/', router);

var server = http.createServer(app);
server.listen(9000);