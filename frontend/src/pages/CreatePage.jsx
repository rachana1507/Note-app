import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import toast from 'react-hot-toast'
// import axios from 'axios'
import api from '../lib/axios'
const CreatePage = () => {
  const [title,setTitle]=useState("")
  const [content,setContent] = useState("")
  const [loading,setLoading] = useState(false)

  const navigate =useNavigate()
  const handleSubmit = async (e)=> {
    e.preventDefault();
    // console.log(title);
    // console.log(content);
    if(!title.trim() || !content){
      toast.error("All fields are required")
      return
    }
    setLoading(true)
    try {
      await api.post("/notes",{
        title,
        content
      })
      toast.success("Note Created successfully")
      navigate("/")
    } catch (error) {
      console.log("Error creating note",error)
      toast.error("Failed to create note")
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6 bg-gray-200'>
            <ArrowLeftIcon className='size-5'/>
            Back to Notes
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
            <h2 className="card-title text-2xl mb-4">Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-control mb-4' >
                <label className='label'>
                  <span className='label-text'>
                    Title
                  </span>
                </label>
                <input type="text" 
                  placeholder='Note title ' 
                  className='input input-bordered' 
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}/>
              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea
                  placeholder='Write your note here...'
                  className='textarea textarea-bordered h-32'
                  value={content}
                  onChange={(e)=>setContent(e.target.value)}
                />
              </div>

              <div className="card-action">
                <button type='submit' className='btn btn-primary' disabled={loading}>
                  {loading ? "Creating...": "Create Note" }
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage