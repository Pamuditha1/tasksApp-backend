const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('../envVariables')

const {User} = require('../modules/userModule')


router.post('/', async (req, res) => {
    
    let user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) res.status(400).send('Invalid Password.')

    const token = jwt.sign({_id : user._id, name: user.username}, env.jewtKey)
    res.status(200).header('x-auth-token', token).json({
        jwt: token,
        msg: 'Logged In Successfully'
    })
    // .catch(e => {
    //     console.log(e)
    //     res.status(404).send(e)
    // })
    return
    
});



module.exports = router;

