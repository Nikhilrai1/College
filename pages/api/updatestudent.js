import connectDB from "../../middleware/mongoose";
import Student from "../../models/Student";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    try {
        if (req.method == "POST") {
            const { name, email, password, address, grade } = req.body;
            const user = await Student.findOne({ email: "nikhilraee11@gmail.com" });
            if (user.isAdmin) {
                let student = await Student.findOneAndUpdate({ email: email}, {
                    name: name,
                    password: password,
                    address: address,
                    grade: grade
                }, { new: true })
                res.status(201).json({ success: true, message: "user updated successfully", info: student });
            }
            else {
                res.status(201).json({ success: true, message: "sorry you are not a admin", info: saveStudent });
            }
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