import connectDB from "../../middleware/mongoose";
import Student from "../../models/Student";
import Teacher from "../../models/Teacher";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    const authHeader = req.headers.authorization;
    const myToken = authHeader.split(' ')[1];
    let user = jwt.verify(myToken, process.env.SECRET_KEY);
    console.log("hello")
    // if (req.method != "PUT") {
    //     res.status(403).json("This method is not valid");
    //     return;
    // }
    try {
        if (user.isAdmin || user.isStudent) {
            const { name, email, gender, dob, stream, group, mobile, profile, address, grade } = req.body;
            const userStudent = await Student.findOne({ email: user.email });
            console.log("student")
            if (userStudent) {
                let student = await Student.findOneAndUpdate({ email: user.email }, {
                    name: name != "" ? name : user.name,
                    gender: gender != "" ? gender : user.gender,
                    dob: dob != "" ? dob : user.dob,
                    address: address != "" ? address : user.address,
                    grade: grade != "" ? grade : user.grade,
                    stream: stream != "" ? stream : user.stream,
                    group: group != "" ? group : user.group,
                    mobile: mobile != "" ? mobile : user.mobile,
                    profile: profile != "" ? profile : user.profile
                }, { new: true })
                console.log(student)
                res.status(201).json({ success: true, message: "user updated successfully", info: student });
            }
            else {
                res.status(404).json({ success: false, message: "user not found", error: "User not found"});
            }
        }
        else if (user.isAdmin || user.isTeacher) {
            const { name, email, subject, address, mobile, gender, dob, profile } = req.body;
            const userTeacher = await Teacher.findOne({ email: user.email });
            console.log("Teacher",userTeacher)
            if (userTeacher) {
                let teacher = await Teacher.findOneAndUpdate({ email: user.email }, {
                    name: name != "" ? name : user.name,
                    gender: gender != "" ? gender : user.gender,
                    dob: dob != "" ? dob : user.dob,
                    address: address != "" ? address : user.address,
                    subject: subject != "" ? subject : user.subject,
                    mobile: mobile != "" ? mobile : user.mobile,
                    profile: profile != "" ? profile : user.profile
                }, { new: true })
                console.log(teacher)
                res.status(201).json({ success: true, message: "user updated successfully", info: teacher });
            }
            else {
                res.status(404).json({ success: false, message: "user not found", error: "User not found"});
            }

        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error");
    }
}

export default connectDB(handler)