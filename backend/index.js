const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const dynamoose = require('dynamoose');
const schema = require('./schema');

dynamoose.local();
dynamoose.AWS.config.update({
    accessKeyId: 'AKID',
    secretAccessKey: 'SECRET',
    region: 'us-east-1'
});

// Create employee model with default options
const Employee = dynamoose.model('Employee', schema.employee);

const app = express();

const employeeRouter = express.Router();

employeeRouter.get('/', (req, res) => {

    Employee.scan().exec((err, data) => {
        res.setHeader('Content.Type', 'application/json');
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

employeeRouter.get('/:uuid', (req, res) => {
    Employee.get({uuid: req.params.uuid}, (err, data) => {
        res.setHeader('Content.Type', 'application/json');
        if(err) {
           res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

employeeRouter.post('/', (req, res) => {

    let newSkills = [];
    for (let i = 0; i < req.body.skills.length; i++) {
        newSkills.push(req.body.skills[i]);
    }
    let empl = new Employee({
        imgUrl: req.body.imgUrl,
        name: req.body.name,
        contact: {
            short: req.body.contact.short,
            email: req.body.contact.email,
            phone: req.body.contact.phone
        },
        skills: newSkills,
        customerContact: req.body.customerContact
    });

    empl.save((err) => {
        console.log(empl);
        res.setHeader('Content.Type', 'application/json');
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(empl);
        }
    })
});

app.use(bodyParser.json());
app.use('/api/v1/employees', employeeRouter);

const server = http.createServer(app);
server.listen(9000);
