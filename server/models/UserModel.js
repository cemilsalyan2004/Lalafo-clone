const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// name, email, password,
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'User name required.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email required.'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        // Regular expression for email validation
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email format.',
    },
    trim: true,
  },
  image: {
    type: String,
    default: 'default.png'
  },
  password: {
    type: String,
    required: [true, 'Password required.'],
    minlength: 6,
    trim: true,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password confirmation required.'],
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: 'Invalid password',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // last three for change password
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// HASHING
userSchema.pre('save', async function (next) {
  // if password doest modified then why need hashing it?
  if (!this.isModified('password')) return next();
  // so there the password is hashed before save to database
  this.password = await bcrypt.hash(this.password, 12);
  // and we dont need passwordConfirm in database
  this.passwordConfirm = undefined;
  return next();
});

// PASSWORD CHANGED TIME FIELD
userSchema.pre('save', function (next) {
  // if password doesnt modified and new then why need to add
  if (!this.isModified('password') || this.isNew) return next();
  // otherwise add field
  this.passwordChangedAt = Date.now();
  next();
});

// COMPARES INCLUDED PASSWORD AND REAL PASSWORD
userSchema.methods.correctPassword = async function (candidatePass, userPass) {
  candidatePass = `${candidatePass}`;
  return await bcrypt.compare(candidatePass, userPass);
};

// CHECKS IF PASSWORD CHANGED AFTER?
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
