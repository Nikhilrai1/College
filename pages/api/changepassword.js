import connectDB from "../../middleware/mongoose";
import Student from "../../models/Student";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    try {
        if (req.method == "PUT") {

            // Destructuring body data
            const { email, password, cpassword, newPassword } = req.body;
            const student = await Student.findOne({ email: email }); // find student from database
            if (student && password === cpassword) { // check student exist or not

                // from database decrypt the password
                let bytes = CryptoJS.AES.decrypt(student.password, process.env.SECRET_KEY);
                let orginalPassword = bytes.toString(CryptoJS.enc.Utf8);

                // check if user given password match or not with database password
                if (password == orginalPassword) {
                    let newpassword = CryptoJS.AES.encrypt(newPassword, process.env.SECRET_KEY).toString();
                    const student = await Student.findOneAndUpdate({ email: email }, {
                        password: newpassword
                    }, { new: true });

                    console.log(newpassword);
                    res.status(201).json({ success: true, message: "user updated successfully", info: student });
                }
            }
            else {
                res.status(400).json({ success: true, message: "Invalid Credentials" });
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