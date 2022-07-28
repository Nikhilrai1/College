const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    profile: { type: String, default:""},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    address: { type: String, required: true },
    subject: { type: String, required: true },
    dob: { type: String, required: true},
    mobile: { type: String, minLength: 10, maxLength: 10, required: true },
    isStudent: { type: Boolean, default: false },
    isTeacher: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);
