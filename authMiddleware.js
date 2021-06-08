const jwt = require('jsonwebtoken')
const env = require('./envVariables')

function authUser(req, res, next) {
    const token = req.header('x-auth-token')

    if(!token) return res.status(401).send('Access Denied. Please Login to Continue')
    
    try{
        const decoded = jwt.verify(token, env.jewtKey)
        console.log("Headers", req.headers)
        console.log(decoded)
        req.user = decoded
        console.log('Auth Success.')
        next()
    }
    catch(ex) {
        res.status(400).send('Invalid Token.')
        console.log('Invalid Token.')
    }
    
}

module.exports = authUser