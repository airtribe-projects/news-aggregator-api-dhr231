const bcrypt = require('bcrypt');
const express=require('express');
const router=express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const {user} = require('../dataStore');
const {body, validationResult} = require('express-validator');
// const user = [];

router.post('/register',
    [body('username').isEmail().withMessage('Username must be a valid email'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long')
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }
    try{
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = {username, password : hashedPassword};
        user.push(newUser);
        console.log('User registered:', newUser);
        console.log('All users:', user);

        res.status(200).send('User registered successfully');
    }
    catch(error){
        res.status(500).send('Error registering user', error);
    }

})

// POST /login - User Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Find the user by username
        const findUser = user.find(u => u.username === username);
        if (!findUser) {
            return res.status(400).send('Cannot find user');
        }

        // 2. Compare the provided password with the stored hash
        if (await bcrypt.compare(password, findUser.password)) {
            console.log('Signing token with secret:', JWT_SECRET); // <-- ADD THIS LINE
            const accessToken = jwt.sign({username : findUser.username}, JWT_SECRET)
            res.json({accessToken : accessToken});
        } else {
            res.status(401).send('Not Allowed'); // 401 Unauthorized
        }
    } catch (error) {
        res.status(500).send('Error logging in');
        console.error(error);
    }
});

module.exports = router;

