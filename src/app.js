import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser" //=>used for making curd opertions in users browser cookies

//any data coming from url comes in "req.params"
//when using any middleware we have to use "app.use()"

//configuring cors
//app.use(cors()) -> this is enough but for more functions we use the other ways
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))

//for making our app able to accept json files with size limit from form
app.use(express.json({limit:"16kb"}))

//for getting data from url we use this middleware
app.use(express.urlencoded({limit:"16kb"}));

//for storing files in own server
app.use(express.static("public"))

//for using cookieparser
app.use(cookieParser())




const app = express()

export {app}