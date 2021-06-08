const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('../envVariables')

const {User} = require('../modules/userModule')


router.post('/', async (req, res) => {
    
    //Check Current Users
    let user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send('Already Registered')

    //Create New User
    let newUser = new User({
        username: req.body.username,
        email: req.body.email ,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)

    await newUser.save();

    //Create Token
    const token = jwt.sign({_id : newUser._id, name: newUser.username}, env.jewtKey)

    //Response
    res.status(200)
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .json({
        jwt: token,
        msg: 'Registered In Successfully'
    })
    // .catch(e => {
    //     console.log(e)
    //     res.status(404).send(e)
    // })

    return
    
});



module.exports = router;

