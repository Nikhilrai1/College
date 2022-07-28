import connectDB from "../../middleware/mongoose";
import Assignment from "../../models/Assignment";
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader.split(' ')[1];
    let user = jwt.verify(accessToken, process.env.SECRET_KEY);
    console.log(user);
    try {
        if (req.method == "GET") {
            if (user.isTeacher || user.isAdmin) {
                const assignments = await Assignment.find({ creatorEmail: user.email });
                console.log(assignments)
                res.status(200).json({ success: true, info: assignments });
            }
            else {
                const assignments = await Assignment.find({ grade: user.grade });
                res.status(200).json({ success: true, info: assignments });
            }
        }
        else {
            res.status(403).json({ success: false, error: "This method is not allowed" });
        }

    }
    catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error");
    }
}

export default connectDB(handler)