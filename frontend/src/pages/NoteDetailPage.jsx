import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';


const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] =useState(true);
  const [saving, setSaving] = useState(false)

  const navigate= useNavigate()

  const {id} =useParams()
  // console.log({id})

  useEffect(()=>{
    const fetchNote = async() => {
      try {
        const res=await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log("Error in fetching note",error)
        toast.error("Failed to fetch the note")
      }finally{
        setLoading(false)
      }
    };
  // };
  fetchNote();
  },[id]);

  // console.log({note});

  const handleDelete = async() => {
    if (!window.confirm("Do you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`)
      toast.success("Deleted successfully")
      navigate("/")
    } catch (error) {
      toast.error("Error deleting note")
      console.log("Error deleting note",error)
    }
  };

  const handleSave =async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return
    }
    setSaving(true)
    try {
      await api.put(`notes/${id}`,note )
      toast.success("Note updated successfully")
      navigate("/")
    } catch (error) {
      toast.error("Error updating notes")
      console.log("Error updating notes",error)
    }finally{
      setSaving(false)
    }
  };

  if(loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10'/>
      </div>
    );
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>



        <div className='flex items-center justify-between mb-6'>
        <Link to={"/"} className='btn btn-ghost mb-6 bg-gray-200'>
            <ArrowLeftIcon className='size-5'/>
            Back to Notes
          </Link>
          <button className='btn btn-ghost text-error mb-6 bg-gray-200' onClick= {handleDelete}>
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">


            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>
                  Title
                </span>
              </label>
              <input
                type="text"
                placeholder='Note title'
                className='input input-bordered'
                value={note.title}
                onChange={(e) => setNote({...note, title:e.target.value})}/>
            </div>

            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Content</span>
              </label>
              <textarea
                placeholder='Write your note here ...'
                className='textarea textarea-bordered h-32'
                value={note.content}
                onChange={(e) => setNote({...note, content: e.target.value})}
              />
            </div>

            <div className="card-actions">
              <button className='btn btn-ghost bg-gray-200'  disabled={saving} onClick={handleSave}>
                {saving? "Saving...": "Save changes"}
              </button>
            </div>

          </div>
        </div>


      </div>
      </div>
    </div>
  )
}

export default NoteDetailPage