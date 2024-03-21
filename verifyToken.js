import jwt from "jsonwebtoken"
const secretKey = 'your_secret_key';
// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(403).json({ error: 'Token is missing' });
    }


    // Verify token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = decoded; // Attach decoded user information to the request object
        next();
    });
}
export default verifyToken;