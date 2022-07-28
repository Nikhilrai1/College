const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true },
    grade: { type: String, required: true },
    desc: { type: String, required: true },
    stream: { type: String, required: true },
    group: { type: String, required: true },
    deadline: { type: String, required: true },
    file: { type: String, default: ""},
    creatorName: { type: String, required: true},
    creatorProfile: { type: String, default: ""},
    creatorEmail: { type: String, required: true},
}, { timestamps: true });

export default mongoose.models.Assignment || mongoose.model('Assignment', AssignmentSchema);
