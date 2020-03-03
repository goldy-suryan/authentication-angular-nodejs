const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: (req, res, next) => {
        let token = req.headers['authorization'];
        if(token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        if(token) {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
                if(err) {
                    return res.status(400).json({ message: 'Token not verified' });
                } else {
                    req.decoded = decodedToken;
                    next();
                }
            });
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
}