const { Schema, model } = require('mongoose');
//const dateFormat = require('../utils/dateFormat');
//const dayFormat = require('../utils/dayFormat');

const scheduleSchema = new Schema({
    scheduleDate: {
        type: Date,
        required: true,
     //   get: (timestamp) => dateFormat(timestamp),
    },
    scheduleHour: {
        type: Number,
        required: true,
    },
    teacher: {
        type: String,
        required:true,
    },
    busy: {
        type: Boolean,
        default:0  
    }
    
});

const Schedule = model('Schedule', scheduleSchema);

module.exports = Schedule;
