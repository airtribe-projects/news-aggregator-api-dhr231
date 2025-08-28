const jwt=require('jsonwebtoken');
const { JWT_SECRET } = require('./config');
const { user } = require('./dataStore');
const authenticateToken=(req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(token == null){
        return res.send(401);

    }
    console.log('Verifying token with secret:', JWT_SECRET);
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){
            return res.sendStatus(403);
        }
        const tuser = user.find(u => u.email === decoded.email);
        if (!tuser) {
            return res.sendStatus(404); // User in token not found
        }
        req.tuser=tuser;
        next();
    })
};

module.exports = authenticateToken; 