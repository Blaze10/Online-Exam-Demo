const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// User login
exports.signup  = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hashedPassword => {
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
        fullName: req.body.fullName,
      });
      user.save()
        .then((savedUser) => {
          res.status(201).json({
            message: 'Signup successful!',
            response: savedUser
          });
        })
        .catch(error => {
          if (error.name === 'ValidationError') {
            return res.status(401).json({
              message: 'This email address is already taken!'
            });
          } else {
            return res.status(404).json({ message: 'Signup failed. Please try again' });
          }
        })
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ message: 'Some error occured. Please try again.' });
    })
};

// User signup
exports.login = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed.' });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({ message: 'Authentication failed.' });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id, role: fetchedUser.role },
        'Super_Secret_Long_Protection_String_For_Hasing',
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        role: fetchedUser.role,
        userId: fetchedUser._id
      });
    })
    .catch(error => {
      return res.status(401).json({ message: 'Authentication failed.' });
    })
};
