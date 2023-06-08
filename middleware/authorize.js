const jwt = require('jsonwebtoken');
const secretKey = "testproject"

const authorize = (roles) => {
    return (req, res, next) => {
      console.log(req.headers)
      const token = req.headers.authorization.split(" ")[1];
  
      if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
      }
  
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Failed to authenticate token.' });
        }
  
        req.user = decoded;
  
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Unauthorized role.' });
        }
  
        next();
      });
    };
  };
module.exports =authorize