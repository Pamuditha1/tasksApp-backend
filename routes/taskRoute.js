const express = require('express');
const router = express.Router();
const authUser = require('../authMiddleware')

const {Task} = require('../modules/taskModule')

router.get('/:id',  async (req, res) => {

    const tasks = await Task.find({user: req.params.id})
    .populate('user', '-password')
    res.status(200).send(tasks)
});


router.post('/add-task',  async (req, res) => {

    let newTask = new Task({
        task: req.body.task,
        status: req.body.status,
        user: req.body.user
    });

    newTask.save()
    .then(r => {

        Task.find({user: req.body.user}).populate('user', '-password').then(r => {
            res.status(200).json({
                r: r,
                msg: 'Task Added'
            })
        })
    })
    .catch(e => {   
        res.status(404).send('Error')
        console.log(e)
    })
});

router.put('/update-task/:id',  async (req, res) => {

    const task = await Task.findById(req.body.id)

    task.status = req.body.status
    task.save()
    .then(() => {

        Task.find({user: req.params.id}).populate('user', '-password').then(r => {
            res.status(200).json({
                r: r,
                msg: 'Task Status Updated'
            })
        })

    })
    .catch(e => {   
        res.status(404).send('Error')
        console.log(e)
    })

    
});


module.exports = router;

