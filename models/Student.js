const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true},
    grade: { type: Number, required: true },
    isTeacher: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
