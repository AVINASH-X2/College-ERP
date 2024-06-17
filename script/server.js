const bcrypt = require('bcrypt');
const express = require('express');
const path = require('path');
const {join} = require("path");
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Reeg_data } = require("./mongo");
const multer = require('multer');
const nodemailer = require("nodemailer")

//Stripe Payment...
var Publishable_Key = 'YOUR_PUBLISHABLE_KEY'
var Secret_Key = 'YOUR_STRIPE_API_KEY'

// UserSchemas/Models...
const {User,Faculty,Admin,Detail,File,Semester1,eeeCourses,Announcement,c_y_1,c_y1_g,eee_att,eee_grade,contactModel} = require("./models")


const stripe = require('stripe')(Secret_Key);
const port = process.env.PORT || 3000;


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const publicpath = path.join(__dirname, '../pubilc')
const showSempathF = path.join(__dirname, '../showSemF');
const showSempathS = path.join(__dirname, '../showSemS');
const CseAttendance = path.join(__dirname, '../cseAttendance');
const EeePath = path.join(__dirname, '../EeeAttendance');
const mainpath = path.join(__dirname, '../script')
const HomePath = path.join(__dirname, '../Home2')
const publicPath3 = path.join(__dirname, '..', 'public')
const getRouter = path.join(__dirname, '../public/loginRoutes');
const pathView = path.join(__dirname, '../views');
const model2Path = path.join(__dirname, '../model2');
const public2Path = path.join(__dirname, '../public2');
const uploadPath = path.join(__dirname, '../script/uploads');
const saltRounds = 10;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('showSem'));

// Seting the view engine and views directory
app.set('view engine', 'ejs');
app.set('script', path.join(__dirname, 'script'));
app.set('views', path.join(__dirname, '../Home2/public'));
app.use(express.static(CseAttendance))
app.use(express.static(publicpath))
app.use(express.static(showSempathF))
app.use(express.static(showSempathS))
app.use(express.static(mainpath))
app.use(express.static(HomePath))
app.use(express.static(EeePath))
app.use(express.static(getRouter))
app.use(express.static(pathView))
app.use(express.static(model2Path))
app.use(express.static(public2Path))
app.use(express.static(uploadPath))


app.set('views', publicPath3)

const getRoutes = require("./getRoutes")


app.get('/welcome', (req, res) => {
    res.render('welcome')
})

app.use("/",  getRoutes);
app.use("/admin_reg", getRoutes);
app.use("/admin_log", getRoutes);
app.use("/student", getRoutes);

//For showSemF (Faculty members)
app.use("/program", getRoutes);
app.use("/semesters", getRoutes);
app.use("/cse_add_sem1", getRoutes);

app.get('/update_sem1/:id', async (req, res) => {
    try {
        // Fetch the subject data by ID
        const subjectId = req.params.id;
        const subjectToUpdate = await Semester1.findOne({ _id: subjectId });
        console.log("Subject found:", subjectToUpdate);
        if (!subjectToUpdate) {
            return res.send('Subject not found');
        }

        // Render the 'update_sem1.ejs' template with subject data
        res.render('../showSemF/update_sem1', { subjectToUpdate });
    } catch (error) {
        console.error('Error rendering update_sem1.ejs:', error);
        res.status(500).send('An error occurred while rendering the update page');
    }
});

//For CSE Attandance (Faculty Use)
app.use("/cse_add_year1", getRoutes);
app.use("/CseProgramsAtt", getRoutes);
app.use("/cse_year1_att", getRoutes);
app.use("/cse_add_year1", getRoutes);


app.get('/cse_year1_att_upd/:id', async (req, res) => {
    try {
        // Fetch the subject data by ID
        const subjectId = req.params.id;
        const dataToUpdate = await c_y_1.findOne({ _id: subjectId });
        console.log("Subject found:", dataToUpdate);
        if (!dataToUpdate) {
            return res.send('Subject not found');
        }

        // Render the 'update_sem1.ejs' template with subject data
        res.render('../cseAttandance/cse_year1_att_upd', { dataToUpdate });
    } catch (error) {
        console.error('Error rendering cse_year1_att_upd.ejs:', error);
        res.status(500).send('An error occurred while rendering the update page');
    }
});

app.get('/cse_year1_att_upd/:id', async (req, res) => {
    try {
        // Fetch the subject data by ID
        const subjectId = req.params.id;
        const dataToUpdate = await c_y_1.findOne({ _id: subjectId });
        console.log("Subject found:", dataToUpdate);
        if (!dataToUpdate) {
            return res.send('Subject not found');
        }

        // Render the 'update_sem1.ejs' template with subject data
        res.render('../cseAttandance/cse_year1_att_upd', { dataToUpdate });
    } catch (error) {
        console.error('Error rendering cse_year1_att_upd.ejs:', error);
        res.status(500).send('An error occurred while rendering the update page');
    }
});

app.post('/cse_year1_att_upd/:id', async (req, res) => {
    const subjectId = req.params.id; // Retrieve the subject's ID from the URL
    const { username, year, semester, starting_month, ending_month, current_month, total_present_required, total_present, total_absent, total_leaves, week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13, week14, week15, week16, week17, week18, week19, week20 } = req.body; // Get the updated values from the form

    try {
        // Find the subject document by ID and update it
        const dataToUpdate = await c_y_1.findOne({ _id: subjectId });

        // Check if the subject exists (based on the provided ID)
        if (!dataToUpdate) {
            return res.send('Subject not found');
        }

        // Update the subject document with new values
        dataToUpdate.username = username;
        dataToUpdate.year = year;
        dataToUpdate.semester = semester;
        dataToUpdate.starting_month = starting_month;
        dataToUpdate.ending_month = ending_month;
        dataToUpdate.current_month = current_month;
        dataToUpdate.total_present_required = total_present_required;
        dataToUpdate.total_present = total_present;
        dataToUpdate.total_absent = total_absent;
        dataToUpdate.total_leaves = total_leaves;
        dataToUpdate.week1 = week1;
        dataToUpdate.week2 = week2;
        dataToUpdate.week3 = week3;
        dataToUpdate.week4 = week4;
        dataToUpdate.week5 = week5;
        dataToUpdate.week6 = week6;
        dataToUpdate.week7 = week7;
        dataToUpdate.week8 = week8;
        dataToUpdate.week9 = week9;
        dataToUpdate.week10 = week10;
        dataToUpdate.week11 = week11;
        dataToUpdate.week12 = week12;
        dataToUpdate.week13 = week13;
        dataToUpdate.week14 = week14;
        dataToUpdate.week15 = week15;
        dataToUpdate.week16 = week16;
        dataToUpdate.week17 = week17;
        dataToUpdate.week18 = week18;
        dataToUpdate.week19 = week19;
        dataToUpdate.week20 = week20;

        // Save the updated document
        await dataToUpdate.save();

        // Re-fetch all subjects from the database
        const cse_year1 = await c_y_1.find();

        // Render the '/cse_sem1' page with the updated data
        res.render('../cseAttandance/cse_year1_att', { cse_year1 });
    } catch (error) {
        console.error('Error during subject update:', error);
        res.status(500).send('An error occurred during subject update');
    }
});

//For CSE Attendance (Student Use)
app.use("/CseYear1Show", getRoutes);
app.use("/CseProgShowStu", getRoutes);


//For EEE Attandance (Faculty Use)
app.use("/eee_add", getRoutes);
app.use("/EeeProgramsAtt", getRoutes);
app.use("/eee_att", getRoutes);


app.post('/eee_add', async (req, res) => {
    const { _id, username, year, semester, starting_month, ending_month, current_month, total_present_required, total_present, total_absent, total_leaves, week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13, week14, week15, week16, week17, week18, week19, week20 } = req.body;

    try {
        console.log('Received data:', _id, username, year, semester, starting_month, ending_month, current_month, total_present_required, total_present, total_absent, total_leaves, week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13, week14, week15, week16, week17, week18, week19, week20);

        // Check if the student already exists in the database
        const existingSubject = await eee_att.findOne({ _id: _id });

        console.log('Existing subject:', existingSubject);

        if (existingSubject) {
            return res.send('Subject already exists');
        }

        // Create a new student document in the "Detail" collection
        await eee_att.create({
            _id: _id,
            username: username,
            year: year,
            semester: semester,
            starting_month: starting_month,
            ending_month: ending_month,
            current_month: current_month,
            total_present_required: total_present_required,
            total_present: total_present,
            total_absent: total_absent,
            total_leaves: total_leaves,
            week1: week1,
            week2: week2,
            week3: week3,
            week4: week4,
            week5: week5,
            week6: week6,
            week7: week7,
            week8: week8,
            week9: week9,
            week10: week10,
            week11: week11,
            week12: week12,
            week13: week13,
            week14: week14,
            week15: week15,
            week16: week16,
            week17: week17,
            week18: week18,
            week19: week19,
            week20: week20
        });

        // Redirect to the '/display' page after successfully adding a new student
        res.redirect('/eee_att');
    } catch (error) {
        console.error('Error during subject registration:', error);
        res.status(500).send('An error occurred during subject registration, Please ensure you are using unique id for each students');
    }
});

app.get('/eee_att_upd/:id', async (req, res) => {
    try {
        // Fetch the subject data by ID
        const subjectId = req.params.id;
        const dataToUpdate = await eee_att.findOne({ _id: subjectId });
        console.log("Subject found:", dataToUpdate);
        if (!dataToUpdate) {
            return res.send('Subject not found');
        }

        // Render the 'update_sem1.ejs' template with subject data
        res.render('../eeeAttendance/eee_att_upd', { dataToUpdate });
    } catch (error) {
        console.error('Error rendering eee_att_upd.ejs:', error);
        res.status(500).send('An error occurred while rendering the update page');
    }
});

app.get('/eee_att_upd/:id', async (req, res) => {
    try {
        // Fetch the subject data by ID
        const subjectId = req.params.id;
        const dataToUpdate = await eee_att.findOne({ _id: subjectId });
        console.log("Subject found:", dataToUpdate);
        if (!dataToUpdate) {
            return res.send('Subject not found');
        }

        // Render the 'update_sem1.ejs' template with subject data
        res.render('../eeeAttendance/eee_att_upd', { dataToUpdate });
    } catch (error) {
        console.error('Error rendering eee_att_upd.ejs:', error);
        res.status(500).send('An error occurred while rendering the update page');
    }
});

app.post('/eee_att_upd/:id', async (req, res) => {
    const subjectId = req.params.id; // Retrieve the subject's ID from the URL
    const { username, year, semester, starting_month, ending_month, current_month, total_present_required, total_present, total_absent, total_leaves, week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13, week14, week15, week16, week17, week18, week19, week20 } = req.body; // Get the updated values from the form

    try {
        // Find the subject document by ID and update it
        const dataToUpdate = await eee_att.findOne({ _id: subjectId });

        // Check if the subject exists (based on the provided ID)
        if (!dataToUpdate) {
            return res.send('Subject not found');
        }

        // Update the subject document with new values
        dataToUpdate.username = username;
        dataToUpdate.year = year;
        dataToUpdate.semester = semester;
        dataToUpdate.starting_month = starting_month;
        dataToUpdate.ending_month = ending_month;
        dataToUpdate.current_month = current_month;
        dataToUpdate.total_present_required = total_present_required;
        dataToUpdate.total_present = total_present;
        dataToUpdate.total_absent = total_absent;
        dataToUpdate.total_leaves = total_leaves;
        dataToUpdate.week1 = week1;
        dataToUpdate.week2 = week2;
        dataToUpdate.week3 = week3;
        dataToUpdate.week4 = week4;
        dataToUpdate.week5 = week5;
        dataToUpdate.week6 = week6;
        dataToUpdate.week7 = week7;
        dataToUpdate.week8 = week8;
        dataToUpdate.week9 = week9;
        dataToUpdate.week10 = week10;
        dataToUpdate.week11 = week11;
        dataToUpdate.week12 = week12;
        dataToUpdate.week13 = week13;
        dataToUpdate.week14 = week14;
        dataToUpdate.week15 = week15;
        dataToUpdate.week16 = week16;
        dataToUpdate.week17 = week17;
        dataToUpdate.week18 = week18;
        dataToUpdate.week19 = week19;
        dataToUpdate.week20 = week20;

        // Save the updated document
        await dataToUpdate.save();

        // Re-fetch all subjects from the database
        const eee = await eee_att.find();

        // Render the '/cse_sem1' page with the updated data
        res.render('../eeeAttendance/eee_att', { eee });
    } catch (error) {
        console.error('Error during subject update:', error);
        res.status(500).send('An error occurred during subject update');
    }
});

//For EEE Attendance (Student Use)
app.use("/eee_log", getRoutes);
app.use("/eee_show", getRoutes);
app.use("/CseYear1Show", getRoutes);
app.use("/CseProgShowStu", getRoutes);


//For showSemS (Student members)
app.use("/s_semesters", getRoutes);
app.use("/s_cse_sem1", getRoutes);
app.use("/s_programs", getRoutes);


//for the studentDetails(Admin Users)
app.use("/display", getRoutes);

app.post('/registration', async (req, res) => {
    const { username, email, gender, program } = req.body;

    try {
        console.log('Received data:', username, email, gender, program);

        // Check if the student already exists in the database
        const existingStudent = await Detail.findOne({ username });

        console.log('Existing student:', existingStudent);

        if (existingStudent) {
            return res.send('Student already exists');
        }

        // Create a new student document in the "Detail" collection
        await Detail.create({
            username: username,
            email: email,
            gender: gender,
            program: program,
        });

        // Redirect to the '/display' page after successfully adding a new student
        res.redirect('/display');
    } catch (error) {
        console.error('Error during student registration:', error);
        res.status(500).send('An error occurred during student registration');
    }
});


//Student Interface System
app.use("/home", getRoutes);
app.use("/login", getRoutes);


app.post('/RegistrationStudent', async (req, res) => {
    const { username, department, semester, state, district, pin, phone, locality, email, gender, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({
            $or: [
                { username: username },
                { email: email },

                // You should not search by password in this manner, as passwords should be securely hashed and stored.
            ]
        });
        // const existingPassword = await User.findOne({ password });

        if (existingUser) {
            return res.send('User already exists');
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user in the database
        await User.create({
            username: username,
            department: department,
            semester: semester,
            state: state,
            district: district,
            pin: pin,
            phone: phone,
            locality: locality,
            password: hashedPassword,
            email: email,
            gender: gender
        });

        // res.send('Signup successful');
        // res.redirect('/login')
        res.send("Student Added Successfully")
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('An error occurred during signup');
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }); // Assuming "users" is the collection name

        if (user) {
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);

            if (passwordMatch) {
                res.redirect(`/home?username=${req.body.username}`)
                // res.status(200).render("home", { naming: req.body.username });
            } else {
                res.send("Incorrect password");
            }
        } else {
            res.send(`User with username '${req.body.username}' not found`);

        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("An error occurred during login");
    }
});

//Faculty Interface System
app.use("/faculty", getRoutes);
app.use("/fac_reg", getRoutes);
app.use("/fac_log", getRoutes);


app.post('/Registration1', async (req, res) => {
    const { username, department, state, district, pin, phone, locality, age, email, gender, password } = req.body;

    try {
        // Check if the username already exists
        const existeringUser = await Faculty.findOne({
            $or: [
                { username: username },
                { email: email },

                // You should not search by password in this manner, as passwords should be securely hashed and stored.
            ]
        });
        // const existingPassword = await User.findOne({ password });

        if (existeringUser) {
            return res.send('User already exists');
        }

        // Hash the password before saving it
        const hashedPassword1 = await bcrypt.hash(password, saltRounds);

        // Create a new user in the database
        await Faculty.create({
            username: username,
            department: department,
            state: state,
            district: district,
            pin: pin,
            phone: phone,
            locality: locality,
            age: age,
            password: hashedPassword1,
            email: email,
            gender: gender
        });

        // res.send('Signup successful');
        // res.redirect('/fac_log')
        res.send("Faculty Member Added Successfully")
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('An error occurred during signup');
    }
});

app.post('/fac_log', async (req, res) => {
    console.log("Reached /fac_log route");
    try {
        const user = await Faculty.findOne({ username: req.body.username });

        if (user) {
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);

            if (passwordMatch) {
                res.redirect(`/faculty?username=${req.body.username}`);
            } else {
                res.send("Incorrect password");
            }
        } else {
            res.send(`User with username '${req.body.username}' not found`);
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("An error occurred during login");
    }
});


//Admin Interface System
app.use("/admin", getRoutes);
app.use("/candidates", getRoutes);



app.post('/Registration2', async (req, res) => {
    const { username, state, district, pin, phone, locality, age, email, gender, password } = req.body;

    try {
        // Check if the username already exists
        const existeringUser = await Admin.findOne({
            $or: [
                { username: username },
                { email: email },

                // You should not search by password in this manner, as passwords should be securely hashed and stored.
            ]
        });
        // const existingPassword = await User.findOne({ password });

        if (existeringUser) {
            return res.send('User already exists');
        }

        // Hash the password before saving it
        const hashedPassword1 = await bcrypt.hash(password, saltRounds);

        // Create a new user in the database
        await Admin.create({
            username: username,
            state: state,
            district: district,
            pin: pin,
            phone: phone,
            locality: locality,
            age: age,
            password: hashedPassword1,
            email: email,
            gender: gender
        });

        // res.send('Signup successful');
        // res.redirect('/admin_log')
        res.send('Admin Added Succesfully')
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('An error occurred during signup');
    }
});

app.post('/admin_log', async (req, res) => {
    console.log("Reached /admin_log route");
    try {
        const user = await Admin.findOne({ username: req.body.username });

        if (user) {
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);

            if (passwordMatch) {
                res.redirect(`/admin?username=${req.body.username}`);
            } else {
                res.send("Incorrect password");
            }
        } else {
            res.send(`User with username '${req.body.username}' not found`);
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("An error occurred during login");
    }
});

//CSE Year1 Students login for their Attendance
app.use("/cse_year1_log", getRoutes);
app.use("/cse_year1_show", getRoutes);



app.post('/cse_year1_log', async (req, res) => {
    console.log("Reached /cse_year1_log route");
    try {
        const user = await c_y_1.findOne({ username: req.body.username });

        if (user) {
            // const semesterMatch = await bcrypt.compare(req.body.semester, user.semester);

            if (req.body.semester === user.semester) {
                res.redirect(`/cse_year1_show?username=${req.body.username}`);
            } else {
                res.send("Incorrect semester");
            }
        } else {
            res.send(`User with username '${req.body.username}' not found`);
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("An error occurred during login");
    }
});

//CSE Year1 Students login for their Grade Information
app.use("/cse_year1_grade_log", getRoutes);
app.use("/cse_year1_grade_show", getRoutes);
app.use("/CseYear1GradeProg", getRoutes);


app.post('/cse_year1_grade_log', async (req, res) => {
    console.log("Reached /cse_year1_grade_log route");
    try {
        const user = await c_y1_g.findOne({ username: req.body.username });

        if (user) {
            // const semesterMatch = await bcrypt.compare(req.body.semester, user.semester);

            if (req.body.semester === user.semester) {
                res.redirect(`/cse_year1_grade_show?username=${req.body.username}`);
            } else {
                res.send("Incorrect semester");
            }
        } else {
            res.send(`User with username '${req.body.username}' not found`);
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("An error occurred during login");
    }
});


app.use("/eee_grade_show", getRoutes);
app.use("/eee_grade_log", getRoutes);
app.use("/eee_grade", getRoutes);
app.use("/eee_add_grade", getRoutes);



app.post('/eee_grade_log', async (req, res) => {
    console.log("Reached /eee_grade_log route");
    try {
        const user = await eee_grade.findOne({ username: req.body.username });

        if (user) {
            // const semesterMatch = await bcrypt.compare(req.body.semester, user.semester);

            if (req.body.semester === user.semester) {
                res.redirect(`/eee_grade_show?username=${req.body.username}`);
            } else {
                res.send("Incorrect semester");
            }
        } else {
            res.send(`User with username '${req.body.username}' not found`);
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("An error occurred during login");
    }
});

app.post('/eee_add_grade', async (req, res) => {
    const { _id, username, department, semester, total_subjects, iat1, iat2, iat3, endSemesterResult, overall_cgpa, class_rank } = req.body;

    try {
        console.log('Received data:', _id, username, department, semester, total_subjects, iat1, iat2, iat3, endSemesterResult, overall_cgpa, class_rank);

        // Check if the student already exists in the database
        const existingSubject = await eee_grade.findOne({ _id: _id });
        const existingSubject1 = await eee_grade.findOne({ username: username });

        console.log('Existing subject:', existingSubject);
        console.log('Existing subject:', existingSubject1);

        if (existingSubject) {
            return res.send('Subject already exists');
        }
        if (existingSubject1) {
            return res.send('Subject already exists');
        }

        // Create a new student document in the "Detail" collection
        await eee_grade.create({
            _id: _id,
            username: username,
            department: department,
            semester: semester,
            total_subjects: total_subjects,
            iat1: iat1,
            iat2: iat2,
            iat3: iat3,
            endSemesterResult: endSemesterResult,
            overall_cgpa: overall_cgpa,
            class_rank: class_rank
        });

        // Redirect to the '/display' page after successfully adding a new student
        res.redirect('/eee_grade');
    } catch (error) {
        console.error('Error during subject registration:', error);
        res.status(500).send('An error occurred during subject registration, Please ensure you are using unique id for each students');
    }
});

app.get('/eee_grade_upd/:id', async (req, res) => {
    try {
        // Fetch the subject data by ID
        const subjectId = req.params.id;
        const dataToUpdate = await eee_grade.findOne({ _id: subjectId });
        console.log("Subject found:", dataToUpdate);
        if (!dataToUpdate) {
            return res.send('Subject not found');
        }

        // Render the 'update_sem1.ejs' template with subject data
        res.render('../eeeAttendance/eee_grade_upd', { dataToUpdate });
    } catch (error) {
        console.error('Error rendering eee_grade_upd.ejs:', error);
        res.status(500).send('An error occurred while rendering the update page');
    }
});


app.get('/update_eee_grade_page/:id', async (req, res) => {
    const subjectId = req.params.id;

    // Fetch the subject document by ID
    const dataToUpdate = await eee_grade.findOne({ _id: subjectId });

    if (!dataToUpdate) {
        return res.send('Subject not found');
    }

    // Render the update form page with the subject's ID pre-filled
    res.render('eee_grade_upd', { dataToUpdate });
});

app.post('/update_eee_grade/:id', async (req, res) => {
    const subjectId = req.params.id; // Retrieve the subject's ID from the URL
    const { username, department, semester, total_subjects, iat1, iat2, iat3, endSemesterResult, overall_cgpa, class_rank } = req.body; // Get the updated values from the form

    try {
        // Find the subject document by ID and update it
        const dataToUpdate = await eee_grade.findOne({ _id: subjectId });

        // Check if the subject exists (based on the provided ID)
        if (!dataToUpdate) {
            return res.send('Subject not found');
        }

        // Update the subject document with new values
        dataToUpdate.username = username;
        dataToUpdate.department = department;
        dataToUpdate.semester = semester;
        dataToUpdate.total_subjects = total_subjects;
        dataToUpdate.iat1 = iat1;
        dataToUpdate.iat2 = iat2;
        dataToUpdate.iat3 = iat3;
        dataToUpdate.endSemesterResult = endSemesterResult;
        dataToUpdate.overall_cgpa = overall_cgpa;
        dataToUpdate.class_rank = class_rank;

        // Save the updated document
        await dataToUpdate.save();

        // Re-fetch all subjects from the database
        const eee_grades = await eee_grade.find();

        // Render the '/cse_sem1' page with the updated data
        res.render('../eeeAttendance/eee_grade', { eee_grades });
    } catch (error) {
        console.error('Error during subject update:', error);
        res.status(500).send('An error occurred during subject update');
    }
});


// For showSemF (Faculty members adding students)
app.use("/cse_sem1", getRoutes);


app.post('/cse_add_sem1', async (req, res) => {
    const { _id, semester, subject, subjectcode, duration } = req.body;

    try {
        console.log('Received data:', _id, semester, subject, subjectcode, duration);

        // Check if the student already exists in the database
        const existingSubject = await Semester1.findOne({ _id: _id });

        console.log('Existing subject:', existingSubject);

        if (existingSubject) {
            return res.send('Subject already exists');
        }

        // Create a new student document in the "Detail" collection
        await Semester1.create({
            _id: _id,
            semester: semester,
            subject: subject,
            subjectcode: subjectcode,
            duration: duration,
        });

        // Redirect to the '/display' page after successfully adding a new student
        res.redirect('/cse_sem1');
    } catch (error) {
        console.error('Error during subject registration:', error);
        res.status(500).send('An error occurred during subject registration');
    }
});

//Faculty members updating subject
app.get('/update_subject_page/:id', async (req, res) => {
    const subjectId = req.params.id;

    // Fetch the subject document by ID
    const subjectToUpdate = await Semester1.findOne({ _id: subjectId });

    if (!subjectToUpdate) {
        return res.send('Subject not found');
    }

    // Render the update form page with the subject's ID pre-filled
    res.render('update_sem1', { subjectToUpdate });
});

app.post('/update_subject/:id', async (req, res) => {
    const subjectId = req.params.id; // Retrieve the subject's ID from the URL
    const { semester, subject, subjectcode, duration } = req.body; // Get the updated values from the form

    try {
        // Find the subject document by ID and update it
        const subjectToUpdate = await Semester1.findOne({ _id: subjectId });

        // Check if the subject exists (based on the provided ID)
        if (!subjectToUpdate) {
            return res.send('Subject not found');
        }

        // Update the subject document with new values
        subjectToUpdate.semester = semester;
        subjectToUpdate.subject = subject;
        subjectToUpdate.subjectcode = subjectcode;
        subjectToUpdate.duration = duration;

        // Save the updated document
        await subjectToUpdate.save();

        // Re-fetch all subjects from the database
        const sem1 = await Semester1.find();

        // Render the '/cse_sem1' page with the updated data
        res.render('../showSemF/cse_sem1', { sem1 });
    } catch (error) {
        console.error('Error during subject update:', error);
        res.status(500).send('An error occurred during subject update');
    }
});

//students viewing courses
app.use("/s_eee", getRoutes);



//Faculty memebers updating courses for EEE branch
app.use("/eee_courses", getRoutes);
app.use("/eee_add_courses", getRoutes);
app.use("/update_eee_courses", getRoutes);



app.post('/eee_add_courses', async (req, res) => {
    const { _id, semester, subject, subjectcode, duration } = req.body;

    try {
        console.log('Received data:', _id, semester, subject, subjectcode, duration);

        // Check if the student already exists in the database
        const existingSubject = await eeeCourses.findOne({ _id: _id });

        console.log('Existing subject:', existingSubject);

        if (existingSubject) {
            return res.send('Subject already exists');
        }

        // Create a new student document in the "Detail" collection
        await eeeCourses.create({
            _id: _id,
            semester: semester,
            subject: subject,
            subjectcode: subjectcode,
            duration: duration,
        });

        // Redirect to the '/display' page after successfully adding a new student
        res.redirect('/eee_courses');
    } catch (error) {
        console.error('Error during subject registration:', error);
        res.status(500).send('An error occurred during subject registration');
    }
});

app.get('/update_eee_courses/:id', async (req, res) => {
    try {
        // Fetch the subject data by ID
        const subjectId = req.params.id;
        const subjectToUpdate = await eeeCourses.findOne({ _id: subjectId });
        console.log("Subject found:", subjectToUpdate);
        if (!subjectToUpdate) {
            return res.send('Subject not found');
        }

        // Render the 'update_sem1.ejs' template with subject data
        res.render('../showSemF/update_eee_courses', { subjectToUpdate });
    } catch (error) {
        console.error('Error rendering update_eee_courses.ejs:', error);
        res.status(500).send('An error occurred while rendering the update page');
    }
});

app.get('/update_eee_courses_page/:id', async (req, res) => {
    const subjectId = req.params.id;

    // Fetch the subject document by ID
    const subjectToUpdate = await eeeCourses.findOne({ _id: subjectId });

    if (!subjectToUpdate) {
        return res.send('Subject not found');
    }

    // Render the update form page with the subject's ID pre-filled
    res.render('update_eee_courses', { subjectToUpdate });
});

app.post('/update_eee_courses/:id', async (req, res) => {
    const subjectId = req.params.id; // Retrieve the subject's ID from the URL
    const { semester, subject, subjectcode, duration } = req.body; // Get the updated values from the form

    try {
        // Find the subject document by ID and update it
        const subjectToUpdate = await eeeCourses.findOne({ _id: subjectId });

        // Check if the subject exists (based on the provided ID)
        if (!subjectToUpdate) {
            return res.send('Subject not found');
        }

        // Update the subject document with new values
        subjectToUpdate.semester = semester;
        subjectToUpdate.subject = subject;
        subjectToUpdate.subjectcode = subjectcode;
        subjectToUpdate.duration = duration;

        // Save the updated document
        await subjectToUpdate.save();

        // Re-fetch all subjects from the database
        const eeeCoursespage = await eeeCourses.find();

        // Render the '/cse_sem1' page with the updated data
        res.render('../showSemF/eee_courses', { eeeCoursespage });
    } catch (error) {
        console.error('Error during subject update:', error);
        res.status(500).send('An error occurred during subject update');
    }
});

//Grade Submission( Faculty Users)
app.use("/CseProgramsGrade", getRoutes);
app.use("/cse_year1_grade", getRoutes);
app.use("/cse_add_year1_grade", getRoutes);


app.post('/cse_add_year1_grade', async (req, res) => {
    const { _id, username, department, semester, total_subjects, iat1, iat2, iat3, endSemesterResult, overall_cgpa, class_rank } = req.body;

    try {
        console.log('Received data:', _id, username, department, semester, total_subjects, iat1, iat2, iat3, endSemesterResult, overall_cgpa, class_rank);

        // Check if the student already exists in the database
        const existingSubject = await c_y1_g.findOne({ _id: _id });

        console.log('Existing subject:', existingSubject);

        if (existingSubject) {
            return res.send('Subject already exists');
        }

        // Create a new student document in the "Detail" collection
        await c_y1_g.create({
            _id: _id,
            username: username,
            department: department,
            semester: semester,
            total_subjects: total_subjects,
            iat1: iat1,
            iat2: iat2,
            iat3: iat3,
            endSemesterResult: endSemesterResult,
            overall_cgpa: overall_cgpa,
            class_rank: class_rank
        });

        // Redirect to the '/display' page after successfully adding a new student
        res.redirect('/cse_year1_grade');
    } catch (error) {
        console.error('Error during subject registration:', error);
        res.status(500).send('An error occurred during subject registration, Please ensure you are using unique id for each students');
    }
});

app.get('/cse_year1_grade_upd/:id', async (req, res) => {
    try {
        // Fetch the subject data by ID
        const subjectId = req.params.id;
        const dataToUpdate = await c_y1_g.findOne({ _id: subjectId });
        console.log("Subject found:", dataToUpdate);
        if (!dataToUpdate) {
            return res.send('Subject not found');
        }

        // Render the 'update_sem1.ejs' template with subject data
        res.render('../cseAttandance/cse_year1_grade_upd', { dataToUpdate });
    } catch (error) {
        console.error('Error rendering cse_year1_att_upd.ejs:', error);
        res.status(500).send('An error occurred while rendering the update page');
    }
});

app.get('/update_cse_year1_grade_page/:id', async (req, res) => {
    const subjectId = req.params.id;

    // Fetch the subject document by ID
    const dataToUpdate = await c_y1_g.findOne({ _id: subjectId });

    if (!dataToUpdate) {
        return res.send('Subject not found');
    }

    // Render the update form page with the subject's ID pre-filled
    res.render('cse_year1_grade_upd', { dataToUpdate });
});

app.post('/update_cse_year1_grade/:id', async (req, res) => {
    const subjectId = req.params.id; // Retrieve the subject's ID from the URL
    const { username, department, semester, total_subjects, iat1, iat2, iat3, endSemesterResult, overall_cgpa, class_rank } = req.body; // Get the updated values from the form

    try {
        // Find the subject document by ID and update it
        const dataToUpdate = await c_y1_g.findOne({ _id: subjectId });

        // Check if the subject exists (based on the provided ID)
        if (!dataToUpdate) {
            return res.send('Subject not found');
        }

        // Update the subject document with new values
        dataToUpdate.username = username;
        dataToUpdate.department = department;
        dataToUpdate.semester = semester;
        dataToUpdate.total_subjects = total_subjects;
        dataToUpdate.iat1 = iat1;
        dataToUpdate.iat2 = iat2;
        dataToUpdate.iat3 = iat3;
        dataToUpdate.endSemesterResult = endSemesterResult;
        dataToUpdate.overall_cgpa = overall_cgpa;
        dataToUpdate.class_rank = class_rank;

        // Save the updated document
        await dataToUpdate.save();

        // Re-fetch all subjects from the database
        const cse_year1_grade = await c_y1_g.find();

        // Render the '/cse_sem1' page with the updated data
        // res.render('../cseAttandance/cse_year1_grade_upd', { cse_year1_grade });
        res.render('../cseAttandance/cse_year1_grade', { cse_year1_grade });
    } catch (error) {
        console.error('Error during subject update:', error);
        res.status(500).send('An error occurred during subject update');
    }
});

//Announcements Admin
app.use("/new_announcement", getRoutes);
app.use("/announcementAdmin", getRoutes);
app.use("/announcementUpdate", getRoutes);



app.post('/new_announcement', async (req, res) => {
    const { _id, date, details } = req.body;

    try {
        console.log('Received data:', _id, date, details);

        // Check if the student already exists in the database
        const existingSubject = await Announcement.findOne({ _id: _id });

        console.log('Existing subject:', existingSubject);

        if (existingSubject) {
            return res.send('Subject already exists');
        }

        // Create a new student document in the "Detail" collection
        await Announcement.create({
            _id: _id,
            date: date,
            details: details
        });

        // Redirect to the '/announcementAdmin' page after successfully adding a new student
        res.redirect('/announcementAdmin');
    } catch (error) {
        console.error('Error during subject registration:', error);
        res.status(500).send('An error occurred during subject registration, Please ensure you are using unique id for each students');
    }
});

app.get('/announcementUpdate/:id', async (req, res) => {
    try {
        // Fetch the subject data by ID
        const subjectId = req.params.id;
        const subjectToUpdate = await Announcement.findOne({ _id: subjectId });
        console.log("Subject found:", subjectToUpdate);
        if (!subjectToUpdate) {
            return res.send('Subject not found');
        }

        // Render the 'update_sem1.ejs' template with subject data
        res.render('../public/announcementUpdate', { subjectToUpdate });
    } catch (error) {
        console.error('Error rendering update_eee_courses.ejs:', error);
        res.status(500).send('An error occurred while rendering the update page');
    }
});

app.get('/upadate_announcement_page/:id', async (req, res) => {
    const subjectId = req.params.id;

    // Fetch the subject document by ID
    const subjectToUpdate = await Announcement.findOne({ _id: subjectId });

    if (!subjectToUpdate) {
        return res.send('Subject not found');
    }

    // Render the update form page with the subject's ID pre-filled
    res.render('announcementUpdate', { subjectToUpdate });
});

app.post('/update_announcement/:id', async (req, res) => {
    const subjectId = req.params.id; // Retrieve the subject's ID from the URL
    const { date, details } = req.body; // Get the updated values from the form

    try {
        // Find the subject document by ID and update it
        const subjectToUpdate = await Announcement.findOne({ _id: subjectId });

        // Check if the subject exists (based on the provided ID)
        if (!subjectToUpdate) {
            return res.send('Subject not found');
        }

        // Update the subject document with new values
        subjectToUpdate.date = date;
        subjectToUpdate.details = details;


        // Save the updated document
        await subjectToUpdate.save();

        // Re-fetch all subjects from the database
        const announce = await Announcement.find();

        // Render the '/cse_sem1' page with the updated data
        res.render('../public/announcementAdmin', { announce });
    } catch (error) {
        console.error('Error during subject update:', error);
        res.status(500).send('An error occurred during subject update');
    }
});

//For students and faculties Announcement
app.use("/announcementStu", getRoutes);


const storage = multer.diskStorage({
    // destination: '../public2/uploads',
    destination: function (req, file, cb) {
        cb(null, '../public2/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename
    },
});

const upload = multer({ storage: storage });

//
app.use("/upPage", getRoutes);
app.use("/upPageS", getRoutes);


app.post('/upload', upload.single('pdfFile'), async (req, res) => {
    const { originalname, path } = req.file; // Using originalname instead of filename
    const file = new File({
        name: originalname, // Storing the original filename
        path: path,
    });
    await file.save();
    res.redirect('/upPage');
});


app.get('/download/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).send('File not found');
        }

        const filePath = path.join(__dirname, file.path);

        // Use the res.download method to send the file for download
        res.download(filePath, file.name, (err) => {
            if (err) {
                console.error('Download error:', err);
                return res.status(500).send('Download failed');
            }
            console.log('File download successful');
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/delete/:id', async (req, res) => {
    const fileId = req.params.id;

    try {
        // Find the file by ID and delete it from MongoDB
        const file = await File.findByIdAndRemove(fileId);

        if (!file) {
            return res.status(404).send('File not found.');
        }

        // Remove the file from the file system
        const filePath = path.join(__dirname, file.path);
        fs.unlinkSync(filePath);

        // Redirect back to the homepage
        res.redirect('/upPage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

//Payments
app.use("/payHome", getRoutes);

app.post('/payment', function (req, res) {

    // Moreover you can take more details from user
    // like Address, Name, etc from form
    console.log("payment done");
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        // name: 'Avinash ',
        name: 'Student User',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '641105',
            city: 'Coimbatore',
            state: 'Tamilnadu',
            country: 'India',
        }
    })
        .then((customer) => {

            return stripe.paymentIntents.create({
                amount: 250000,     // Charging Rs 2500
                description: 'Exam Fee',
                currency: 'INR',
                customer: customer.id
            });
        })
        .then((charge) => {
            res.send("Success")  // If no error occurs
        })
        .catch((err) => {
            res.send(err)       // If some error occurs
        });
})

//Sending messages...
app.use("/contact", getRoutes);

app.post("/contact", async (req, res) => {
    try {
        const { name, email, phone, subject, comment} = req.body;

        // Ensure all required fields are present
        if (!name || !email || !phone || !subject) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // const existingUser = await contactModel.findOne({ email });
        // if (existingUser) {
        //     console.log("Email already in use...");
        //     return res.status(400).json({ message: "Email already in use" });
        // }

        await contactModel.create({
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            comment: comment,
        })

        // Send welcome email to the user
        const sendWelcomeEmail = async () => {
            try {
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false, // or 'STARTTLS'
                    auth: {
                        user: "sinhaak321@gmail.com",
                        pass: "qyni splx fnuh tmke",
                    },
                });

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Welcome to our platform!',
                    text: 'Hello! Welcome to our platform!',
                    html: `
                        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                            <h1>Welcome to our platform!</h1>
                            <p>Hello,</p>
                            <p>Thank you for registering at our web page. We are thrilled to have you as part of our community.</p>
                            <p>Here are some things you can do now:</p>
                            <ul>
                                <li>Explore our features and services</li>
                                <li>Connect with other users</li>
                                <li>Stay updated with the latest news and updates</li>
                            </ul>
                            <p>If you have any questions, feel free to reply to this email. We're here to help!</p>
                            <p>Best regards,</p>
                            <p>The Dev Team</p>
                        </div>
                    `,
                };

                await transporter.sendMail(mailOptions);
                console.log(`Welcome email sent to ${email}`);
            } catch (error) {
                console.error("Error sending welcome email: ", error);
            }
        };

        await sendWelcomeEmail();

        // Send notification email to the admin
        const sendAdminNotification = async () => {
            try {
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false, // or 'STARTTLS'
                    auth: {
                        user: "sinhaak321@gmail.com",
                        pass: "qyni splx fnuh tmke",
                    },
                });

                const mailOptions = {
                    from: "sinhaak321@gmail.com",
                    to: "akff7739@gmail.com",
                    subject: 'New User Registered',
                    text: `A new user has registered with the following details:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                            <h1>New User Registration</h1>
                            <p>A new user has registered with the following details:</p>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Phone:</strong> ${phone}</p>
                        </div>
                    `,
                };

                await transporter.sendMail(mailOptions);
                console.log(`Admin notification email sent to akff7739@gmail.com(Admin)`);
            } catch (error) {
                console.error("Error sending admin notification email: ", error);
            }
        };

        await sendAdminNotification();

        // const userCount = await contactModel.countDocuments();
        // console.log("Count from the db", userCount);
        // res.send(userCount.toString());
        // console.log("Count again...: ", userCount.toString());
    } catch (err) {
        console.error("Error creating user: ", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const {createServer} = require("http")
const {Server} = require("socket.io");
const { type } = require('os');

const port2 = 3001;
const server = createServer(app);
const io = new Server(server);

app.get("/chat", (req, res) =>{
    // res.send("<h1>Hello, There!</h1>")
    res.sendFile(join(__dirname, '../public/chat.html'));
})

io.on("connection", (socket) =>{
    console.log("a user connected");

    socket.on("chat message", (msg) =>{
        // console.log("message: ", (msg));

        io.emit("chat message", msg);
    })
})

server.listen(port2, (req, res) =>{
    console.log("Listening...");
})
