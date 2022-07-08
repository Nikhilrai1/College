import connectDB from "../../middleware/mongoose";
import Student from "../../models/Student";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    try {
        if (req.method == "POST") {
            const { name, email, password, address, grade } = req.body;
            let student = new Student({
                name,
                email,
                password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
                address,
                grade,
            });
            let saveStudent = await student.save();
            console.log(saveStudent);
            res.status(201).json({success: true,info: saveStudent});
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