const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const studentData = mongoose.createConnection("mongodb://127.0.0.1:27017/FacultyForm", { useNewUrlParser: true, useUnifiedTopology: true });

studentData.on('connected', () => {
    console.log('studentDetails mongoose connected');
});

studentData.on('error', (err) => {
    console.log('studentDetails database connection failed');
    console.error(err);
});

const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure uniqueness
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure uniqueness
    },
    gender: String,
    program: String,
});


// Create the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
