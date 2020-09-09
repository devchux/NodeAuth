const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['auth-token'];

    if (!token) return res.status(400).json({ error: "You are not logged in" });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
}

module.exports = verifyToken