import connectDB from "../../middleware/mongoose";
import Teacher from "../../models/Teacher";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    try {
        if (req.method == "POST") {
            const { name, email, password, subject, address, mobile, gender, dob, profile } = req.body;
            let teacher = new Teacher({
                name,
                gender,
                dob,
                email,
                password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
                address,
                subject,
                mobile,
                profile
            });
            let saveTeacher = await teacher.save();
            console.log(saveTeacher);
            res.status(201).json({ success: true, info: saveTeacher });
        }
        else {
            res.status(403).json("This method is not valid");
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error");
    }
}

export default connectDB(handler)