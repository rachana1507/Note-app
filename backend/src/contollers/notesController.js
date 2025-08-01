import Note from "../models/Note.js"

// export const getAllNotes = (req,res)=>{
//     res.status(200).send("you just fetched the notes");
// };

export async function getAllNotes(req,res) {
    try {
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes)
    } catch(error){
        console.error("Error in getAllNotes controller",error)
        res.status(500).json({message:"Internal server error"})
    }
    // res.status(200).send("you just fetched the notes");
};

export async function getNoteById(req,res) {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({message: "Note not found"})
        res.status(200).json(note)
    } catch(error){
        console.error("Error in getNoteById controller",error)
        res.status(500).json({message:"Internal server error"})
    }
    // res.status(200).send("you just fetched the notes");
};

export async function createNote(req,res){
    try{ 
        const {title,content}=req.body
        const newNote= new Note({title:title, content:content})

        await newNote.save()
        res.status(201).json("Node Created Successfully")
    }catch(error){
        console.error("Error in createNote controller",error)
        res.status(500).json({message:"Internal server error"})
    }
    // res.status(201).json({message:"Note created successfully"});
}

export async function updateNote(req,res){
    try{
        const {title,content}=req.body
        const updatedNote=await Note.findByIdAndUpdate(req.params.id,{title,content}, {new: true})
        if(!updatedNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json({message:"Note updated successfully"})
    }catch(error){
        console.error("Error in updateNote controller",error)
        res.status(500).json({message:"Internal server error"})
    }
    // res.status(200).json({message:"Note updated successfully"});
}

export async function deleteNote(req,res){
    try{
        const deleteNote=await Note.findByIdAndDelete(req.params.id)
        if (!deleteNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json({message:"Note deleted successfully"})

    }catch(error){
        console.error("Error in deleteNote controller",error)
        res.status(500).json({message:"Internal server error"})
    }
    // res.status(200).json({message:"Note deleted successfully"});
}