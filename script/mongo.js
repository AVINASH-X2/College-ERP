const mongoose = require('mongoose');

// Define a connection for the "RegistrationForm" database
mongoose.connect("mongodb://127.0.0.1:27017/RegistrationForm", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('mongoose connected');
    })
    .catch((e) => {
        console.log('failed');
    });

// Define a separate connection for the "FacultyForm" database
// const facultyConnection = mongoose.createConnection("mongodb://127.0.0.1:27017/FacultyForm", { useNewUrlParser: true, useUnifiedTopology: true });

// facultyConnection.on('connected', () => {
//     console.log('Second mongoose connected');
// });

// facultyConnection.on('error', (err) => {
//     console.log('Second database connection failed');
//     console.error(err);
// });

// Define the schema for the Registration form
const RegistrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{collation: 'registrationStudent'});

// Define the schema for the Faculty form
const FacultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create a model for the Faculty form in the "FacultyForm" database
// const FacultyModel = facultyConnection.model('Faculty', FacultySchema);

// Create a model for the Registration form in the "RegistrationForm" database
const Reeg_data = mongoose.model('Registration', RegistrationSchema);

module.exports = {
    Reeg_data
    // FacultyModel
};
