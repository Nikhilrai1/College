import connectDB from "../../middleware/mongoose";
import Assignment from "../../models/Assignment";
var jwt = require('jsonwebtoken');



const handler = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const accessToken = authHeader.split(' ')[1];
        const assignmentId = req.headers.id;
        const creatorEmail = req.headers.email;
        let user = jwt.verify(accessToken, process.env.SECRET_KEY);
        if (user.isTeacher || user.isAdmin) {
            if (req.method == "DELETE") {
                console.log(creatorEmail,user.email)
                if (creatorEmail == user.email) {
                    const assignment = await Assignment.deleteOne({ _id: assignmentId });
                    res.status(200).json({ success: true, info: "Delete Successful." });
                }
                else {
                    res.status(403).json({ success: false, info: "Unauthorized" });
                }
            }
            else {
                console.log("Invalid method")
                res.status(403).json({ success: false, error: "This method is not valid." });
            }
        }
        else {
            res.status(403).json({ success: false, info: "Unauthorized" });
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: "Internal Server Error." });
    }
}

export default connectDB(handler)