const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;

// Connect to MongoDB (replace 'your-db-uri' with your actual MongoDB URI)
mongoose.connect('mongodb://127.0.0.1:27017/RegistrationForm', { 
useNewUrlParser: true, useUnifiedTopology: true });


// Define a User schema and model (assuming you have a 'users' collection)
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    gender: String
});

const User = mongoose.model('User', userSchema);
const csspath = path.join(__dirname, '../CSS')
// Middleware to serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname,'public')));
app.use('/css',express.static(path.join(__dirname, 'CSS')))

// Set the view engine to EJS
app.set('view engine', 'ejs');

// app.get('/home', (req,res)=>{
//     res.sendFile(path.join(__dirname, '../public', 'home.ejs'))
// })

// Define a route to render the profile page
// Update the route for rendering the profile page
app.get('/home', async (req, res) => {
    try {
        // Fetch user data from the database (you may need to query by user ID)
        const user = await User.findOne({ /* your query criteria */ });

        if (!user) {
            return res.status(404).send('User not found'); // Handle when user data is not found
        }

        // Construct the correct file path to the EJS template in the "public" directory
        const templatePath = path.join(__dirname, '../public', 'home.ejs');

        // Render the profile page with user data
        res.render(templatePath, { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred. Please try again later.'); // Handle other errors
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

