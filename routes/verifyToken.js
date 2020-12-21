const jwt = require('jsonwebtoken');

const auth = (req, resp, next)=>{
    const token = req.header('auth-token');
    if (!token) resp.status(400).json({message:'Auth token absent'}).send();
    if (token) {
        try {
            const verifyToken = jwt.verify(token,process.env.PRIVATE_KEY);
            req.user=verifyToken
            next();
        } catch (error) {
             resp.status(400).json({message:error}).send();
        }
    }
}

module.exports = auth;
