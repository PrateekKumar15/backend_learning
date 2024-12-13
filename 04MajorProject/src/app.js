import express, { urlencoded } from "express";
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express();
//  we use "use" method of "app" to make changes in configuration
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }

));// this is to apply a common origin on different rigin files

app.use(express.json({
    limit: '16kb'
})) // this is to apply a limit while receiving data in form of json

app.use(urlencoded({
    extended:true,
    limit: '16kb',
}))// this is to apply a limit while receiving data in form of url
app.use(express.static("public")) // this is to make data files public 
app.use(cookieParser()) // this is to use cookie parser

export {app};
