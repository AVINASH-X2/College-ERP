// models/file.js
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/RegistrationForm", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('mongoose connected');
    })
    .catch((e) => {
        console.log('failed');
    });


const fileSchema = new mongoose.Schema({
  name: String,
  path: String,
});

module.exports = mongoose.model('File', fileSchema);
