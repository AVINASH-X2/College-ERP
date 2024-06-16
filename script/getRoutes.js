const express = require("express");
const router = express.Router();
const {join} = require("path");
const path = require('path');


const {User,Faculty,Admin,Detail,File,Semester1,eeeCourses,Announcement,c_y_1,c_y1_g,eee_att,eee_grade,contactModel} = require("./models")


router.get("/", (req, res) =>{
    res.sendFile(join(__dirname, "../public/index.html"))
})

router.get("/admin_reg", (req, res) =>{
    res.sendFile(path.join(__dirname, "../public/admin_reg.html"));
})

router.get('/admin_log', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'admin_log.html'))
})

router.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'student.html'));
});

router.get('/programs', (req, res) => {
    res.sendFile(path.join(__dirname, '../showSemF', 'programs.html'));
})

router.get('/semesters', (req, res) => {
    res.sendFile(path.join(__dirname, '../showSemF', 'semesters.html'));
})

router.get('/cse_add_sem1', (req, res) => {
    res.sendFile(path.join(__dirname, '../showSemF', 'cse_add_sem1.html'));
})


router.get('/cse_add_year1', (req, res) => {
    res.sendFile(path.join(__dirname, '../cseAttandance', 'cse_add_year1.html'));
})

router.get('/CseProgramsAtt', (req, res) => {
    res.sendFile(path.join(__dirname, '../cseAttandance', 'CseProgramsAtt.html'))
});

router.get('/cse_year1_att', async (req, res) => {
    try {
        // Fetch all students from the "Detail" collection
        const cse_year1 = await c_y_1.find();

        // Render the "cse_year1_att.ejs" file with the student data
        res.render('../cseAttandance/cse_year1_att', { cse_year1 });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).send('An error occurred while fetching student data');
    }
});

router.post('/cse_add_year1', async (req, res) => {
    const { _id, username, year, semester, starting_month, ending_month, current_month, total_present_required, total_present, total_absent, total_leaves, week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13, week14, week15, week16, week17, week18, week19, week20 } = req.body;

    try {
        console.log('Received data:', _id, username, year, semester, starting_month, ending_month, current_month, total_present_required, total_present, total_absent, total_leaves, week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13, week14, week15, week16, week17, week18, week19, week20);

        // Check if the student already exists in the database
        const existingSubject = await Semester1.findOne({ _id: _id });

        console.log('Existing subject:', existingSubject);

        if (existingSubject) {
            return res.send('Subject already exists');
        }

        // Create a new student document in the "Detail" collection
        await c_y_1.create({
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
        res.redirect('/cse_year1_att');
    } catch (error) {
        console.error('Error during subject registration:', error);
        res.status(500).send('An error occurred during subject registration, Please ensure you are using unique id for each students');
    }
});




router.get('/CseYear1Show', (req, res) => {
    res.sendFile(path.join(__dirname, '../showSemS', 'CseYear1Show.html'))
});

router.get('/CseProgShowStu', (req, res) => {
    res.sendFile(path.join(__dirname, '../showSemS', 'CseProgShowStu.html'))
});



router.get('/eee_add', (req, res) => {
    res.sendFile(path.join(__dirname, '../eeeAttendance', 'eee_add.html'));
})

router.get('/EeeProgramsAtt', (req, res) => {
    res.sendFile(path.join(__dirname, '../eeeAttendance', 'EeeProgramsAtt.html'))
});

router.get('/eee_att', async (req, res) => {
    try {
        // Fetch all students from the "Detail" collection
        const eee = await eee_att.find();

        // Render the "cse_year1_att.ejs" file with the student data
        res.render('../eeeAttendance/eee_att', { eee });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).send('An error occurred while fetching student data');
    }
});


router.get('/eee_log', (req, res) => {
    res.sendFile(path.join(__dirname, '../eeeAttendance', 'eee_log.html'))
});

router.get('/eee_show', async (req, res) => {
    try {
        const username = req.query.username; // Get the username from the URL parameter

        // Fetch attendance data from the database based on the username
        const user = await eee_att.findOne({ username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const templatePath = path.join(__dirname, '../eeeAttendance', 'eee_show.ejs');

        // Render the profile page with faculty user data
        res.render(templatePath, { user }); // Assuming your EJS file is named 'faculty.ejs'
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred. Please try again later.');
    }
});

router.get('/CseYear1Show', (req, res) => {
    res.sendFile(path.join(__dirname, '../showSemS', 'CseYear1Show.html'))
});

router.get('/CseProgShowStu', (req, res) => {
    res.sendFile(path.join(__dirname, '../showSemS', 'CseProgShowStu.html'))
});




router.get('/s_semesters', (req, res) => {
    res.sendFile(path.join(__dirname, '../showSemS', 's_semesters.html'));
})

router.get('/s_cse_sem1', async (req, res) => {
    try {
        // Fetch all students from the "Detail" collection
        const sem1 = await Semester1.find();

        // Render the "display.ejs" file with the student data
        res.render('../showSemS/s_cse_sem1', { sem1 });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).send('An error occurred while fetching student data');
    }
});

router.get('/s_programs', async (req, res) => {
    res.sendFile(path.join(__dirname, '../showSemS', 's_programs.html'));
});



router.get('/display', async (req, res) => {
    try {
        // Fetch all students from the "Detail" collection
        const students = await User.find();

        // Render the "display.ejs" file with the student data
        res.render('display', { students });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).send('An error occurred while fetching student data');
    }
});



router.get('/home', async (req, res) => {
    try {
        const username = req.query.username; // Get the username from the URL parameter

        // Fetch user data from the database based on the username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Construct the correct file path to the EJS template in the "public" directory
        const templatePath = path.join(__dirname, '../public', 'home.ejs');

        // Render the profile page with user data
        res.render(templatePath, { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred. Please try again later.');
    }
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'))
})




router.get('/faculty', async (req, res) => {
    try {
        const username = req.query.username; // Get the username from the URL parameter

        // Fetch faculty user data from the database based on the username
        const user = await Faculty.findOne({ username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const templatePath = path.join(__dirname, '../public', 'faculty.ejs');

        // Render the profile page with faculty user data
        res.render(templatePath, { user }); // Assuming your EJS file is named 'faculty.ejs'
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred. Please try again later.');
    }
});

router.get('/fac_reg', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'fac_reg.html'))
})

router.get('/fac_log', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'fac_log.html'))
})




router.get('/admin', async (req, res) => {
    try {
        const username = req.query.username; // Get the username from the URL parameter

        // Fetch faculty user data from the database based on the username
        const user = await Admin.findOne({ username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const templatePath = path.join(__dirname, '../public', 'admin.ejs');

        // Render the profile page with faculty user data
        res.render(templatePath, { user }); // Assuming your EJS file is named 'admin.ejs'
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred. Please try again later.');
    }
});

router.get('/candidates', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'candidates.html'))
});




router.get('/cse_year1_log', (req, res) => {
    res.sendFile(path.join(__dirname, '../cseAttandance', 'cse_year1_log.html'))
});

router.get('/cse_year1_show', async (req, res) => {
    try {
        const username = req.query.username; // Get the username from the URL parameter

        // Fetch attendance data from the database based on the username
        const user = await c_y_1.findOne({ username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const templatePath = path.join(__dirname, '../cseAttandance', 'cse_year1_show.ejs');

        // Render the profile page with faculty user data
        res.render(templatePath, { user }); // Assuming your EJS file is named 'faculty.ejs'
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred. Please try again later.');
    }
});



router.get('/cse_year1_grade_log', (req, res) => {
    res.sendFile(path.join(__dirname, '../cseAttandance', 'cse_year1_grade_log.html'))
});

router.get('/cse_year1_grade_show', async (req, res) => {
    try {
        const username = req.query.username; // Get the username from the URL parameter

        // Fetch attendance data from the database based on the username
        const user = await c_y1_g.findOne({ username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const templatePath = path.join(__dirname, '../cseAttandance', 'cse_year1_grade_show.ejs');

        // Render the profile page with faculty user data
        res.render(templatePath, { user }); // Assuming your EJS file is named 'faculty.ejs'
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred. Please try again later.');
    }
});

router.get('/CseYear1GradeProg', (req, res) => {
    res.sendFile(path.join(__dirname, '../showSemS', 'CseYear1GradeProg.html'))
});




router.get('/eee_grade_show', async (req, res) => {
    try {
        const username = req.query.username; // Get the username from the URL parameter

        // Fetch attendance data from the database based on the username
        const user = await eee_grade.findOne({ username });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const templatePath = path.join(__dirname, '../eeeAttendance', 'eee_grade_show.ejs');

        // Render the profile page with faculty user data
        res.render(templatePath, { user }); // Assuming your EJS file is named 'faculty.ejs'
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred. Please try again later.');
    }
});

router.get('/eee_grade_log', (req, res) => {
    res.sendFile(path.join(__dirname, '../eeeAttendance', 'eee_grade_log.html'))
});

router.get('/eee_grade', async (req, res) => {
    try {
        // Fetch all students from the "Detail" collection
        const eee_grades = await eee_grade.find();

        // Render the "cse_year1_att.ejs" file with the student data
        res.render('../eeeAttendance/eee_grade', { eee_grades });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).send('An error occurred while fetching student data');
    }
});

router.get('/eee_add_grade', (req, res) => {
    res.sendFile(path.join(__dirname, '../eeeAttendance', 'eee_add_grade.html'));
})




router.get('/cse_sem1', async (req, res) => {
    try {
        // Fetch all students from the "Detail" collection
        const sem1 = await Semester1.find();

        // Render the "display.ejs" file with the student data
        res.render('../showSemF/cse_sem1', { sem1 });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).send('An error occurred while fetching student data');
    }
});



router.get('/s_eee', async (req, res) => {
    try {
        // Fetch all students from the "Detail" collection
        const eeeCoursespage = await eeeCourses.find();

        // Render the "display.ejs" file with the student data
        res.render('../showSemS/s_eee', { eeeCoursespage });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).send('An error occurred while fetching student data');
    }
});



router.get('/eee_courses', async (req, res) => {
    try {
        // Fetch all students from the "Detail" collection
        const eeeCoursespage = await eeeCourses.find();

        // Render the "display.ejs" file with the student data
        res.render('../showSemF/eee_courses', { eeeCoursespage });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).send('An error occurred while fetching student data');
    }
});

router.get('/eee_add_courses', (req, res) => {
    res.sendFile(path.join(__dirname, '../showSemF', '/eee_add_courses.html'))
})

router.get('/update_eee_courses', (req, res) => {
    res.sendFile(path.join(__dirname, '../showSemF', '/update_eee_courses.ejs'))
})

router.get('/CseProgramsGrade', (req, res) => {
    res.sendFile(path.join(__dirname, '../cseAttandance', 'CseProgramsGrade.html'))
});

router.get('/cse_year1_grade', async (req, res) => {
    try {
        // Fetch all students from the "Detail" collection
        const cse_year1_grade = await c_y1_g.find();

        // Render the "cse_year1_att.ejs" file with the student data
        res.render('../cseAttandance/cse_year1_grade', { cse_year1_grade });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).send('An error occurred while fetching student data');
    }
});




router.get('/new_announcement', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'new_announcement.html'))
});

router.get('/announcementAdmin', async (req, res) => {
    try {
        // Fetch all students from the "Detail" collection
        const announce = await Announcement.find();

        // Render the "cse_year1_att.ejs" file with the student data
        res.render('../public/announcementAdmin', { announce });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).send('An error occurred while fetching student data');
    }
});

router.get('/announcementUpdate', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', '/announcementUdate.ejs'))
})

router.get('/cse_add_year1_grade', (req, res) => {
    res.sendFile(path.join(__dirname, '../cseAttandance', 'cse_add_year1_grade.html'));
})




router.get('/announcementStu', async (req, res) => {
    try {
        // Fetch all students from the "Detail" collection
        const announce = await Announcement.find();

        // Render the "cse_year1_att.ejs" file with the student data
        res.render('../public/announcementStu', { announce });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).send('An error occurred while fetching student data');
    }
});



router.get('/upPage', async (req, res) => {
    const files = await File.find();
    res.render(path.join(__dirname, '../views', 'upPage.ejs'), { files });
});

router.get('/upPageS', async (req, res) => {
    const files = await File.find();
    res.render(path.join(__dirname, '../views', 'upPageS.ejs'), { files });
});




router.get('/payHome', function (req, res) {
    console.log("Rout Accessed!~");
    res.render(path.join(__dirname, '../views', 'payHome.ejs'), {
        key: Publishable_Key
    })
})


router.get("/contact", (req, res) =>{
    res.sendFile(join(__dirname, "../public/contact.html"));
})






module.exports = router;