import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.MONGO_URI);
// const express=require("express")

//End point:- A combination of a URL + HTTP method that lets 
// the client interact with a specific resource.

const app=express();
connectDB();

app.use("/api/notes",notesRoutes)
  
app.listen(5001, ()=> {
    console.log("Server started on PORT: 5001");
});



//mongodb+srv://rachanaaithal24:HCAaJ71HSJNiuGam@cluster0.sfvgowk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
