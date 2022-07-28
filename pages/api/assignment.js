import connectDB from "../../middleware/mongoose";
import Assignment from "../../models/Assignment";
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {

    try {
        const authHeader = req.headers.authorization;
        const myToken = authHeader.split(' ')[1];
        let user = jwt.verify(myToken, process.env.SECRET_KEY);
        console.log(user)
        if (user.isTeacher) {
            if (req.method == "POST") {
                const { title, subject, grade, stream, desc, fileUrl, group, deadline } = req.body;
                console.log(myToken)
                console.log(user.email)
                let assignment = new Assignment({
                    title, subject, grade, stream, desc, file: fileUrl, 
                    group, deadline, creatorProfile:user.profile, creatorName: user.name, creatorEmail: user.email
                });
                let saveAssignment = await assignment.save();
                console.log(assignment);
                res.status(201).json({ success: true, info: saveAssignment });
            }
            else {
                res.status(403).json({ success: false, error: "This method is not allowed" });
            }
        }
        else {
            res.status(403).json({ success: false, error: "Un authorized" });
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error");
    }
}

export default connectDB(handler)