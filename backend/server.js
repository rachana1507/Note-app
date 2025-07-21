import express from "express"

// const express=require("express")

//End point:- A combination of a URL + HTTP method that lets 
// the client interact with a specific resource.

const app=express();

//route1
app.get("/api/notes", (req,res)=>{
    res.status(200).send("you got 10 notes");
});

app.post("/api/notes", (req,res)=>{
    res.status(201).json({message:"Note created successfully"});
});

app.put("/api/notes/:id", (req,res)=>{
    res.status(200).json({message:"Note updated successfully"});
});
//http://localhost:5001/api/notes/2121247836578 dynamic id


app.put("/api/notes/:id", (req,res)=>{
    res.status(200).json({message:"Note deleted successfully"});
});
  
app.listen(5001, ()=> {
    console.log("Server started on PORT: 5001");
});
