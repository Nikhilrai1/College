import connectDB from "../../middleware/mongoose";
import Student from "../../models/Student";



const handler = async (req, res) => {
    try {
        if (req.method == "DELETE") {
            const s = await Student.findOne({email: req.body.email});
            const student = await Student.deleteOne({email: req.body.email});
            console.log(student);
            res.status(200).json(s+" deleted successfully");
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