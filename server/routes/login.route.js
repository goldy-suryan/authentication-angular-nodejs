const route = require('express').Router();
const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

route.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });

        if(user) {
            let compared = await bcryptjs.compare(password, user.password)
            if(compared) {
                const token = jwt.sign( { user: user.email }, process.env.TOKEN_SECRET, {
                    expiresIn: 60 * 60
                });
                res.status(200).json({ success: true, message: 'Login successful', user,  token });
            } else {
                return res.status(401).json({success: false,  message: 'Unauthorized, email or password does not match ' });
            }
        } else {
            return res.status(401).json({ success: false, message: 'Unauthorized, email or password does not match ' });
        }
    } catch(e) {
        return res.status(500).json({ message: e.message });
    }
});

module.exports = route;