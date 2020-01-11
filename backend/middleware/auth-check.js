const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authToken = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(authToken, 'Super_Secret_Long_Protection_String_For_Hasing');
    if (!decodedToken) {
      return res.status(401).json({
        message: 'Authentication Required'
      });
    }
    req.userData = {email: decodedToken.email, userId: decodedToken.userId, role: decodedToken.role};
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: 'Auth Failed'
    });
  }
};
