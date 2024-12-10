// require("dotenv").config({path: './env'})
import dotenv from 'dotenv';
import mongoose from "mongoose"
import express from "express"
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import { configDotenv } from "dotenv"
import { app } from './app.js';


dotenv.config({
    path:"./env"
});

connectDB().then(
    () => {
        app.listen(process.env.PORT||8000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
            })
        }
        ).catch(
            (err) => {
                console.log("Connection to MongoDB failed !!!",err)
                }
)








/*const app = express()
;(async()=> {
    try {
        await mongoose.connect(`${process.env.MOngoDB_URI}/${DB_NAME}`)
        app.on("error",(error)=> {
            console.log("Error",error);
            throw error
        })
        app.listen(process.env.PORT,()=> {
            console.log("Server is running on port 8000");
            })
        console.log('Connected to MongoDB')
        } catch (error) {
            console.error('Error connecting to MongoDB:', error)
            throw error
            }
})() */
//sometimes we can get error in iffey if we have not used semi colan  in above code so to avoid such errors we put a semi colan at the beginning
