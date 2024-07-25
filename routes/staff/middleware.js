import jwt from 'jsonwebtoken';

const is_staff_login = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers['authorization'];
        if (!token) {
           return res.render('staff/login');
        }
        const tokenPart = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
        const decoded = jwt.verify(tokenPart, process.env.JWT_SECRET_KEY); 
        req.user = decoded; 
        next();
    } catch (error) {
        console.error('Error in auth middleware:', error);
        // return res.status(400).json({ message: "Invalid token." });
        return res.render('staff/login');
    }
};

export default is_staff_login;
