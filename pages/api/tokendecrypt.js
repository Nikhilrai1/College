import connectDB from "../../middleware/mongoose";
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {

    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            if (req.method == "GET") {
                const Token = authHeader.split(' ')[1];
                let user = jwt.verify(Token, process.env.SECRET_KEY);
                res.status(200).json({ success: true, info: user })
            }
            else {
                res.status(403).json({ success: false, error: "Invalid Method." })
            }
        }
        else {
            res.status(403).json({ success: false, error: "Please authenticate properly." })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error");
    }
}

export default connectDB(handler)