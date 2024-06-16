const { default: mongoose, mongo } = require("mongoose");

//1
const UserSchema =   mongoose.Schema({
    username: String,
    department: String,
    semester: String,
    state: String,
    district: String,
    pin: String,
    phone: String,
    locality: String,
    email: String,
    gender: String,
    password: String,
}, { collection: 'users' });

//2
const facultyDataSchema =   mongoose.Schema({
    username: String,
    department: String,
    state: String,
    district: String,
    pin: String,
    phone: String,
    locality: String,
    age: String,
    email: String,
    gender: String,
    password: String,
}, { collection: 'facultyUsers' });

//3
const adminDataSchema =   mongoose.Schema({
    username: String,
    state: String,
    district: String,
    pin: String,
    phone: String,
    locality: String,
    age: String,
    email: String,
    gender: String,
    password: String,
}, { collection: 'adminUsers' });
//4
const adminSchema =   mongoose.Schema({
    username: String,
    email: String,
    gender: String,
    program: String,
}, { collection: 'detatails' });

//5
const fileSchema =   mongoose.Schema({
    name: String,
    path: String,
});

//6
const sem1 =   mongoose.Schema({
    _id: String,
    semester: String,
    subject: String,
    subjectcode: String,
    duration: String,
}, { collection: 'sem1' });

//7
const EeeCourse =   mongoose.Schema({
    _id: String,
    semester: String,
    subject: String,
    subjectcode: String,
    duration: String,
}, { collection: 'EeeCourses' });

//8
const Announcements =   mongoose.Schema({
    _id: String,
    date: String,
    details: String
}, { collection: 'Announcements' })

//9
const Cse_Year1_Attandance =   mongoose.Schema({
    _id: String,
    username: String,
    year: String,
    semester: String,
    starting_month: String,
    ending_month: String,
    current_month: String,
    total_present_required: String,
    total_present: String,
    total_absent: String,
    total_leaves: String,
    week1: String,
    week2: String,
    week3: String,
    week4: String,
    week5: String,
    week6: String,
    week7: String,
    week8: String,
    week9: String,
    week10: String,
    week11: String,
    week12: String,
    week13: String,
    week14: String,
    week15: String,
    week16: String,
    week17: String,
    week18: String,
    week19: String,
    week20: String
}, { collection: 'Cse_Year1_Attendance' });

//10
const Cse_Year1_Grade =   mongoose.Schema({
    _id: String,
    username: String,
    department: String,
    semester: String,
    total_subjects: String,
    iat1: String,
    iat2: String,
    iat3: String,
    endSemesterResult: String,
    overall_cgpa: String,
    class_rank: String
}, { collection: 'Cse_Year1_Grade' })

//11
const Eee_Attandance =   mongoose.Schema({
    _id: String,
    username: String,
    year: String,
    semester: String,
    starting_month: String,
    ending_month: String,
    current_month: String,
    total_present_required: String,
    total_present: String,
    total_absent: String,
    total_leaves: String,
    week1: String,
    week2: String,
    week3: String,
    week4: String,
    week5: String,
    week6: String,
    week7: String,
    week8: String,
    week9: String,
    week10: String,
    week11: String,
    week12: String,
    week13: String,
    week14: String,
    week15: String,
    week16: String,
    week17: String,
    week18: String,
    week19: String,
    week20: String
}, { collection: 'Eee_Attendance' });

//12
const Eee_Grade =   mongoose.Schema({
    _id: String,
    username: String,
    department: String,
    semester: String,
    total_subjects: String,
    iat1: String,
    iat2: String,
    iat3: String,
    endSemesterResult: String,
    overall_cgpa: String,
    class_rank: String
}, { collection: 'Eee_Grade' })

//13
const contactSchema =   mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
   
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    subject:{
        type: String,
        required: true,
    },
    comment:{
        type:String,
        required: true,
    }
})



const User = mongoose.model('User', UserSchema);
const Faculty = mongoose.model('Faculty', facultyDataSchema);
const Admin = mongoose.model('Admin', adminDataSchema);
const Detail = mongoose.model('Detail', adminSchema);
const File = mongoose.model('File', fileSchema);
const Semester1 = mongoose.model('Semester1', sem1);
const eeeCourses = mongoose.model('eeeCourses', EeeCourse);
const Announcement =  mongoose.model('announce', Announcements);
const c_y_1 =  mongoose.model('c_y_1', Cse_Year1_Attandance);
const c_y1_g =   mongoose.model('c_y1_g', Cse_Year1_Grade);
const eee_att =   mongoose.model('eee_att', Eee_Attandance);
const eee_grade =   mongoose.model('eee_grade', Eee_Grade);
const contactModel = mongoose.model("contact", contactSchema);


module.exports = {
    User,
    Faculty,
    Admin,
    Detail,
    File,
    Semester1,
    eeeCourses,
    Announcement,
    c_y_1,
    c_y1_g,
    eee_att,
    eee_grade,
    contactModel,
}