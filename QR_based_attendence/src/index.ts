import express from 'express';
import { UserModel,SessionsModel,FacultyModel , OsModel} from './db';
const app = express();
app.use(express.json());
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { JWT_PASSWORD } from './config';


import cors from 'cors';
app.use(cors());



app.post("/api/v1/signup", async (req, res) => {
    //zod validation
      const student_name = req.body.student_name;
        const password = req.body.password;
        const enrollment_number = req.body.enrollment_number;
        const course = req.body.course;
        const mobile_number = req.body.mobile_number;
        const email = req.body.email;
        try {
          const user = await  UserModel.create({
            student_name : student_name, 
            password : password,
            enrollment_number : enrollment_number,
            course : course,
            mobile_number : mobile_number,
            email : email
          })
        
        
          res.json(
            {
              "message": "Student added to databae successfully",
              user : user
             
            }
         
          )
    
    }catch(e){
       res.status(411).json({
        message : "User already exists"
       })
    }
  
  });


app.post("/faculty/signup", async (req, res) => {
    //zod validation
      const faculty_name = req.body.faculty_name;
        const unique_id = req.body.unique_id;
        const department = req.body.department;
        const mobile_number = req.body.mobile_number;
        try {
          const faculty = await  FacultyModel.create({
            faculty_name : faculty_name, 
            unique_id : unique_id,
            department : department,
            mobile_number : mobile_number
          })
        
        
          res.json(
            {
              "message": "Faculty added to databae successfully",
              faculty : faculty
             
            }
         
          )
    
    }catch(e){
       res.status(411).json({
        message : "Faculty already exists"
       })
    }
  
  });

app.post("/api/v1/session",  async (req, res) => {

    const { start_time, end_time, faculty_name ,studentId,paper_code} = req.body;
    console.log(studentId)
   

    const faculty = await FacultyModel.findOne({ 
        faculty_name: faculty_name
     }).select('unique_id');

    const student = await UserModel.findOne({
        enrollment_number : studentId[0]
    }).select('student_name');


    const faculty_id = faculty!.unique_id;
    const student_name = [student!.student_name];
    

    console.log(student_name)

    // current date in DDMMYYYY format
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0'); // Ensure 2 digits for day
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits for month
    const year = currentDate.getFullYear();
    const formattedDate = `${day}${month}${year}`;
  
    // start_time and end_time are in "HHMM" format 
    // start_time =1200
    //end_time = 1400
    const session_id = `${formattedDate}${start_time}${end_time}${faculty_id}${paper_code}`;

    console.log(session_id)

    const attendence = (end_time-start_time)/100

    console.log(attendence)
    


    
    const existingSession = await SessionsModel.findOne({ session_id });
  
    if (existingSession) {
      // If the session already exists, add the students to the session
      existingSession.studentId.push(...studentId); // pushing students in array
      existingSession.student_name.push(...student_name);
    

      await existingSession.save();  // Save the updated session
      res.json({
        message: "Session updated with new students",
        session: existingSession,
      });
    } else {
      // If the session doesn't exist, create a new session with students
      const session = await SessionsModel.create({
        session_id,
        studentId: studentId,
        student_name,
        attendance: attendence,
      });
  

        console.log(session)


        res.json(
            {
                "message": "You have been market present",
            })
    
       
   
        }

        if (paper_code == 1234){
            const existingstudent = await OsModel.findOne({ studentId });

            if(existingstudent){
                existingstudent.attendence = existingstudent.attendence! + attendence
                await existingstudent.save();  

            }
         else {
           await OsModel.create({
            student_name,
            studentId,
            attendence
           })
         }
        }


});


app.get("/api/v1/session/os", async (req, res) => {
   
    try {
        console.log("Hey")
        
  const os_attendance = await OsModel.find({});
 // console.log(os_attendance);
  res.json({
    message: 'Attendence found',
    os_attendance
  });
        
      }
     catch (error) {
      console.log(error)
      };
    
  });



app.get('/api/v1/session/:session_id', async (req, res) => {
    const { session_id } = req.params; // Extract session_id from the URL
  
    try {
      // Find the session by session_id in the SessionsModel
      const session = await SessionsModel.findOne({ session_id });
  
      if (session) {
        // If session exists, return the session details
        res.json({
          message: 'Session found',
          session,
        });
      } else {
        // If session does not exist, return a not found message
        res.status(404).json({
          message: 'Session not found',
        });
      }
    } catch (error) {
      console.error('Error fetching session:', error);
      res.status(500).json({
        message: 'An error occurred while fetching the session',
      });
    }
  });














  



  app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
  });




