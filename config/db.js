const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(`${MONGO_URL}${DB_NAME}`).then(()=>{
    console.log("Connected to database")
}).catch((err)=>{
    console.log("Failed to connect to Database")
})