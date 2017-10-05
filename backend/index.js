var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var dynamoose = require('dynamoose');
var uuid = require('uuid');
var schema = require('./schema');

dynamoose.local();
dynamoose.AWS.config.update({
    accessKeyId: 'AKID',
    secretAccessKey: 'SECRET',
    region: 'us-east-1'
});

// Create employee model with default options
var Employee = dynamoose.model('Employee', schema.employee);

var app = express();

var employeeRouter = express.Router();

employeeRouter.get('/', (req, res) => {

    Employee.scan().exec((err, data) => {
        if (err) {
            res.setHeader('Content.Type', 'application/json');
            res.status(500).send(err);
        } else {
            res.setHeader('Content.Type', 'application/json');
            res.status(200).send(data);
        }
    });
})

employeeRouter.post('/', (req, res) => {

    let newSkills = new Array();
    for (let i = 0; i < req.body.skills.length; i++) {
        newSkills.push(req.body.skills[i]);
    }
    var empl = new Employee({
        imgUrl: req.body.imgUrl,
        uuid: uuid.v4(),
        name: req.body.name,
        contact: {
            short: req.body.contact.short,
            email: req.body.contact.email,
            phone: req.body.contact.phone
        },
        skills: newSkills,
        customerContact: req.body.customerContact
    });

    console.log(empl);

    empl.save((err) => {
        if (err) {
            res.setHeader('Content.Type', 'application/json');
            res.status(500).send(err);
        } else {
            res.setHeader('Content.Type', 'application/json');
            res.status(201).send(empl);
        }
    })
})

app.use(bodyParser.json());
app.use('/v1/employees', employeeRouter);

var server = http.createServer(app);
server.listen(9000);