import mongoose, {model, Schema} from 'mongoose';


mongoose.connect("yourmongourl");

const userSchema = new Schema({
    student_name : { type: String, required: true },
    password: { type: String, required: true },
    enrollment_number : { type: String, required: true, unique: true },
    course:{ type: String, enum : ['computer engineering','electronics engineering','electrical engineering'], required: true},
    mobile_number : { type: String, required: true, unique: true },
    email : { type: String, required: false, unique: true },
  });

export const UserModel = model("User", userSchema);

/*{
    "student_name":"Arnav_Gupta",
    "password":"123123",
    "enrollment_number":"23DOCEBTCS0000",
    "course":"computer engineering",
    "mobile_number":"9123456789",
    "email":"test@ce.du.ac.in"
} */



const facultySchema = new Schema({
//userId:[{type: mongoose.Types.ObjectId, ref: 'User', required: true}],
faculty_name : { type: String, required: true },
unique_id : { type: String, required: true, unique: true },
department:{type: String,required: true},
mobile_number : { type: String, required: true, unique: true },
});


/*{
   {
    "faculty_name":"unmesh pro",
    "unique_id":"0000",
    "department":"computer engineering",
    "mobile_number":"9123456789"
}
} */
export const FacultyModel = model("Faculty", facultySchema);

const sessionsSchema = new Schema({
    session_id: { type: String, required: true, unique: false },
    studentId: [{ type: String, required: true }],
    student_name: [{ type: String, required: true }],
    attendance: {
      type: Number, 
      required: true,
    },
  });
  

sessionsSchema.index({ session_id: 1, studentId: 1 }, { unique: true });


/*{

    "faculty_name":"unmesh pro",
    "start_time" : 1000,
    "end_time":1200,
    "studentId":["23DOCEBTCS0000"],
    "paper_code":1234

} */


export const SessionsModel = model("Sessions", sessionsSchema);

const osSchema = new Schema({
    studentId: [{ type: String, required: true }],
    student_name: [{ type: String, required: true }],
    attendence : {type : Number}

})

export const OsModel = model("os",osSchema);

