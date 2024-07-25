import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    console.log('Auth middleware called');
    try {
        const token = req.cookies.token || req.headers['authorization'];
        console.log('Token:', token);

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // If using 'Bearer' token format, split and get the actual token
        const tokenPart = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

        const decoded = jwt.verify(tokenPart, process.env.JWT_SECRET_KEY);
        console.log('Decoded token:', decoded);

        // Ensure the token contains the user's object ID
        if (!decoded || !decoded.id) {
            return res.status(400).json({ message: "Invalid token payload." });
        }

        req.user = decoded;
        console.log('req.user:', req.user);

        next();
    } catch (error) {
        console.error('Error in auth middleware:', error);
        return res.status(400).json({ message: "Invalid token." });
    }
};

export default authMiddleware;
