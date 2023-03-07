const { Schema, model } = require('mongoose');

const scheduleSchema = new Schema(
    {
        scheduleDate: {
            type: Date,
            required: true,
        },
        scheduleHour: {
            type: Number,
            required: true,
        },
        teacher: {
            type: String,
            required: true,
        },
        teacherId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        themeId: {
            type: Schema.Types.ObjectId,
            ref: "Theme"
        },
        student: {
            type: String,
            default: null
        },
        studentId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
);

const Schedule = model('Schedule', scheduleSchema);

module.exports = Schedule;
