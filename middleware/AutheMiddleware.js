const jwt = require('jsonwebtoken');
// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, '1234');
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token is not valid.' });
    }
};

module.exports = verifyToken
