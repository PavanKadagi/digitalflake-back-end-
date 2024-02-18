const jwt = require('jsonwebtoken')

const authentication = async (req, res, next) => {
    try {
        const header = req.header('Authorization');
        const token = header.split(' ')[1];
        // console.log(token,"Authorization")
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        jwt.verify(token, process.env.SECRETE_KEY, (err, user) => {
            if (err) return res.status(403).json({ message: 'Token expired or invalid' });
            req.user = user;
            next();
        }); 
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ error: "Unauthorized:No token provided" })
    }
}

module.exports = authentication;