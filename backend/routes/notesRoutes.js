import express from "express";

const router=express.Router();

router.get("/",(req,res)=>{
    res.status(200).send("you just fetched the notes");
});

router.post("/", (req,res)=>{
    res.status(201).json({message:"Note created successfully"});
});

router.put("/:id", (req,res)=>{
    res.status(200).json({message:"Note updated successfully"});
});

router.delete("/:id", (req,res)=>{
    res.status(200).json({message:"Note deleted successfully"});
});

export default router;

// //route1
// app.get("/api/notes", (req,res)=>{
//     res.status(200).send("you got 10 notes");
// });

// app.post("/api/notes", (req,res)=>{
//     res.status(201).json({message:"Note created successfully"});
// });

// app.put("/api/notes/:id", (req,res)=>{
//     res.status(200).json({message:"Note updated successfully"});
// });
// //http://localhost:5001/api/notes/2121247836578 dynamic id

// app.delete("/api/notes/:id", (req,res)=>{
//     res.status(200).json({message:"Note deleted successfully"});
// });