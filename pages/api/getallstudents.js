import connectDB from "../../middleware/mongoose";
import Student from "../../models/Student";




const handler = async (req, res) => {
    try {
        if (req.method == "GET") {
            const allstudents = await Student.find();
            console.log(allstudents);
            res.status(200).json({allstudents})
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