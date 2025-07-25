import React from 'react'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import RateLimitedUI from '../components/RateLimitedUI'
// import axios from 'axios'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'

const HomePage = () => {
    const [isRateLimited, setRateLimited] = useState(false)
    const [notes, setNotes] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(()=> {
        const fetchNotes = async () => {
            try {
                // const res = await fetch("http://localhost:5001/api/notes")
                // const data = await res.json();
                //CORS error
                const res = await api.get("/notes")
                console.log(res.data)
                setNotes(res.data)
                setRateLimited(false)
            } catch (error) {
                console.log("Error fetching notes");
                if(error.response.status===429){
                    setRateLimited(true)
                }else {
                    toast.error("Failed to load notes")
                }
            } finally {
                setloading(false)
            }
        }
        fetchNotes(); 
    }, [])

    return (
    <div className='min-h-screen'>
        <Navbar />
        {/* <div className="p-4 text-center text-balck">HomePage Content</div> Test element */}
        {isRateLimited && <RateLimitedUI />}
        <div className='max-w-7xl mx-auto p-4 mt-6'>
            {loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}
            {!loading && notes.length===0 && !isRateLimited && <NotesNotFound />}
            {notes.length>0 && !isRateLimited && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {notes.map(note => (
                        <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                        // <div>
                        //     {note.title} | {note.content}
                        // </div>
                    ))}
                </div>
            )}
        </div>
    </div>
    )
}

export default HomePage