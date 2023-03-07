const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const temaSchema = require('./Theme');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    rol: {
      type: String,
      required: true
    },
    temas: [temaSchema],
    fechas: [
      {
        type: Schema.Types.ObjectId,
        ref: "Schedule"
      }
    ]
  },
  {
    id: false
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;