const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authToken = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);
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
