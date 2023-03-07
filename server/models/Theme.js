const { Schema, model } = require('mongoose');

const themeSchema = new Schema(
    {
        theme: {
            type: String,
            teacher: String,
            required: true,
        },
    }
);

module.exports = themeSchema;