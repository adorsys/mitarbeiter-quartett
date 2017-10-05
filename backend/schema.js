const dynamoose = require('dynamoose');
const uuid = require('uuid');

var employee = new dynamoose.Schema({
    uuid: {
        type: String,
        hashKey: true,
        default: uuid.v4()
    },
    imgUrl: {
        type: String,
        required: false
    },
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