const route = require('express').Router();
const User = require('../model/user.model');
const bcryptjs = require('bcryptjs');

route.post('/register', async (req, res) => {
    try {
        let { userName, firstName, lastName, email, password } = req.body;
        let user = await User.findOne({ email });

        if(user) {
            res.status(409).json({ success: false, message: 'User already registered' });
        } else {
            let salt = await bcryptjs.genSalt(10);
            let hash = await bcryptjs.hash(password, salt);
            let newUser = new User();
            newUser['email'] = email;
            newUser['password'] = hash;
            newUser['userName'] = userName;
            newUser['firstName'] = firstName;
            newUser['lastName'] = lastName;
            await newUser.save()
            res.status(201).json({ success: true, message: 'User created successfully' });
        }
    } catch(e) {
        return res.status(500).json({ message: e.message });
    }
});

module.exports = route;