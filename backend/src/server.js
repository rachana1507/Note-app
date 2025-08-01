import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import path from "path"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

// console.log(process.env.MONGO_URI);
// const express=require("express")

//End point:- A combination of a URL + HTTP method that lets 
// the client interact with a specific resource.


const app=express();
const PORT=process.env.PORT || 5001
const __dirname=path.resolve()

if(process.env.NODE_ENV!=="production"){
    app.use(cors({
    origin: "http://localhost:5173",
}));
}


// app.use(rateLimiter)


//middleware will parse json bodies: req.body
app.use(express.json())
app.use(rateLimiter);

// app.use((req, res, next)=> {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// });

app.use("/api/notes",notesRoutes)

if(process.env.NODE_ENV==="production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}
  
connectDB().then(()=> {
    app.listen(PORT, ()=> {
        console.log("Server started on PORT:",PORT);
    });
});
