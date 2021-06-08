const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')

const env = require('./envVariables')

const task = require('./routes/taskRoute')
const register = require('./routes/registerRoute')
const login = require('./routes/loginRoute')

mongoose.connect(env.mongoDB)
    .then(() => {console.log('Connected to mongoDB')})
    .catch((err) => {console.log('Could not Connect to mongoDB', err)})


app.use(cors())
app.use(express.json());
app.use('/', task)
app.use('/register', register)
app.use('/login', login)



const port = process.env.PORT || 3004;
app.listen(port, () => console.log(`Listening on port ${port} ...`));


