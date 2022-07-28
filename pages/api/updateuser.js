import connectDB from "../../middleware/mongoose";
import Student from "../../models/Student";
import Teacher from "../../models/Teacher";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    const authHeader = req.headers.authorization;
    const myToken = authHeader.split(' ')[1];
    let user = jwt.verify(myToken, process.env.SECRET_KEY);
    if (req.method != "PUT") {
        res.status(403).json("This method is not valid");
        return;
    }
    try {
        if (user.isAdmin || user.isStudent) {
            const { name, email, password, address, grade } = req.body;
            let student = await Student.findOneAndUpdate({ email: email }, {
                name: name,
                password: password,
                address: address,
                grade: grade
            }, { new: true })
            res.status(201).json({ success: true, message: "user updated successfully", info: student });
        }
        else if (user.isAdmin || user.isTeacher) {
            const { name, email, password, address, grade } = req.body;
            const user = await teacher.findOne({ email: email });
            let student = await Student.findOneAndUpdate({ email: email }, {
                name: name,
                password: password,
                address: address,
                grade: grade
            }, { new: true })
            res.status(201).json({ success: true, message: "user updated successfully", info: student });
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error");
    }
}

export default connectDB(handler)