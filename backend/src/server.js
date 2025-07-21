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
const PORT=process.env.PORT || 5001
connectDB();

//middleware
app.use(express.json())

app.use("/api/notes",notesRoutes)
  
app.listen(PORT, ()=> {
    console.log("Server started on PORT:",PORT);
});
