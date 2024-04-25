const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticationMiddleware')
const Task = require('../modals/Task')

router.get('/test', (req, res) => {
    res.send({messgae:"task routes are working"})
})

//curd task for authenticated users

//create a task
router.post('/', auth, async (req, res) => {

    try {
        //description,complted from req.body
        //try to get owner:req.user._id
        const task = new Task({
            ...req.body,
            owner: req.user._id
        })
        await task.save();
        res.status(200).json({
            task,
            meassage: "New task added successfully"
        })
    }
    catch (error) {
        res.status(400).send({ error: error.message })
        console.log(error.message)
    }
})

//get the tasks
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id })
        res.status(200).send({ tasks })
    } catch (error) {
        res.status(404).send({ error: error.meassage })
        console.log(error.message)
    }
})

//get a task by id
router.get('/:id', auth, async (req, res) => {
    const taskid = req.params.id
    try {

        const task = await Task.findOne({ _id: taskid, owner: req.user._id })
        if (!task) {
            res.status(404).json({ message: "Task not found" })
        }
        else {
            res.status(200).json({ task })
        }

    } catch (error) {
        res.status(404).send({ error: error.meassage })
        console.log(error.message)
    }
})

//update a task - can updated the description and completed field
router.patch('/:id', auth, async (req, res) => {
    const taskid = req.params.id
    const updates = Object.keys(req.body);
    // console.log(req.body);
    const allowedUpdated = ['description', 'completed'];
    {
        //The every() method executes a function for each array element.
        //The every() method returns true if the function returns true for all elements.
        //The every() method returns false if the function returns false for one element.

        //we are checking if every element in the updates array in present in alloweupdated arrays
    }
    const isValidOperation = updates.every(ele => allowedUpdated.includes(ele));

    if (!isValidOperation) {
        res.status(404).send({ Error: "Invalid updates" })
    }
    try {
        const task = await Task.findOneAndUpdate({ _id:taskid }, req.body,{new:true})
        console.log(task)
        if (!task) {
            res.status(404).json({ Error: "Task not found" })
        }

        res.status(200).json({ task, message: "Task successfullt updatedd" })

    } catch (error) {
        res.status(500).send({ error: error.meassage })
        console.log(error.message)
    }
})

//delete a task 
router.delete('/:id',auth, async (req,res)=>{
    const taskid = req.params.id;
    try {
        const task = await Task.findOneAndDelete({ _id:taskid ,owner:req.user._id})
        console.log(task)
        if (!task) {
            res.status(404).json({ Error: "Task not found" })
        }

        res.status(200).json({ task, message: "Task successfullt deleted" })

    } catch (error) {
        res.status(500).send({ error: error.meassage })
        console.log(error.message)
    }
})



module.exports = router