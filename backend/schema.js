var dynamoose = require('dynamoose');

var employee = new dynamoose.Schema({
    id: Number,
    imgUrl: String,
    uuid: String,
    name: String,
    contact: {
        short: String, // Kürzel
        email: String,
        phone: String
    },
    skills: [{
        tag: String,
        value: Number
    }],
    customerContact: Boolean
        // travelReadiness: {
        //     days: [String],
        //     radius: number
        // },
        // projectBlacklist: [String],
});

module.exports = {
    employee
}