import express from "express"
import notesRoutes from "./routes/notesRoutes.js"

// const express=require("express")

//End point:- A combination of a URL + HTTP method that lets 
// the client interact with a specific resource.

const app=express();

app.use("/api/notes",notesRoutes)
  
app.listen(5001, ()=> {
    console.log("Server started on PORT: 5001");
});
