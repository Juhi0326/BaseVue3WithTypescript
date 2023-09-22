const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.secret_JWT_KEY);
    req.userData = decoded;
    if (req.userData.role === 'admin') {
      next();
    } else {
      return res.status(401).json({
        message: 'Auth failed (in admin)',
        currentlyRole: req.userData.role,
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed',
    });
  }
};
