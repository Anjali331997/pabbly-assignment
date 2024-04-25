const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./config/db');

const taskRouter = require('./routes/taskRoutes')
const userRouter = require('./routes/userRoutes')
const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json())
app.use(express.json())
app.use('/users',userRouter)
app.use('/tasks',taskRouter)

//routes
app.get('/',(req,res)=>{
    res.json({message:"Simple task manager, Home route"})
})

app.listen(PORT,()=>{
    console.log(`Listening to port:${PORT}`)
})
