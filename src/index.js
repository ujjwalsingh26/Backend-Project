//DB connection can be of two type-(1)directly add the code in the index.js file (2)add connection codes in db folder and import it in the index.js



//---------first approch of connecting DB-----------

// import mongoose from "mongoose";
// import {DB_NAME} from "./constants"

// //certain times we use the express here only and then we use listen int the try catch block while connecting the db
// import express from "express"
// const app = express()

// //packages nedded-> dotenv,mongoose,express


// // function connectDB(){}
// // connectDB()

// //we can also use ifei concept=> ()(); first is function creation then call the fuction immediately
// //we will always use async await as database is so far so the response can take time

// (async()=>{
//   try {
//     //first is the url of db created and then db name 
//     await mongoose.connect(`${process.env.MONGODB_URI} ${DB_NAME}`)
//     app.on("error",(error)=>{
//       console.log("Error:",error);
//       throw error
//     })

//     app.listen(process.env.PORT,()=>{
//       console.log(`App is listening on port:${process.env.PORT}`);
      
//     })
//   } catch (error) {
//     console.log(error);
//   }
// })()



//------------Second Approach---------------

// connecting function is written in db.js

// import mongoose from "mongoose";
// import {DB_NAME} from "./constants"

import connectDB from "./db/db.js";



//importing dotenv file->makes all the env variables available as soon as possible
// require('dotenv').config({path:'./env'}) -> first way 


import dotenv from "dotenv";
dotenv.config({
  path: './.env'
});


//we should use then and catch for better coding
connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000 ,()=>{
    console.log(`Server is running at : ${process.env.PORT}`);
    
  })
})
.catch((error)=>{
  console.log("MobgoDb connection failed",error);
  
})
