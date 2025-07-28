import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeftIcon, LoaderCircleIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'react-hot-toast'; // for toast notifications
import api from '../lib/axios';


const NoteDetail = () => {
    const [note, setnotes] = useState(null);
    const [saving, setsaving] = useState(false);
    const [loading, setloading] = useState(true);
    const navigate = useNavigate();

    const {id} = useParams(); 

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`);
                setnotes(res.data);

            } catch (error) {
                console.log("Error fetching the note", error);
                toast.error("Note Doesn't Exist");
            }
            finally{
                setloading(false);
            }
        }
        fetchNote();
    },[id]);

    const handleDelete = async () => {
        if(!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note Deleted Successfully");
            navigate("/");
        } catch (error) {
            console.log("Error deleting the note", error);
            toast.error("Failed to delete Note");
        }
    }

    const handleSave = async () => {
        if(!note.title.trim() || !note.content.trim()){
            toast.error("Title and Content are Required");
            return;
        }
        setsaving(true);
        try {
            await api.put(`/notes/${id}`, note);
            toast.success("Note Updated Successfully", {
                    position: 'top-center'
                });
            navigate("/");
        } catch (error) {
            console.log("Error updating the note", error);
            toast.error("Failed to update Note", {
                position: 'top-center'
            });
        } finally {
            setsaving(false);
        }
    }

    if(loading){
        return (
            <div className='min-h-screen bg-base-200 flex items-center justify-center'>
                <LoaderCircleIcon className='animate-spin size-10'/>
            </div>
        );
    }

  return (
    <div className='min-h-screen bg-base-200'>
        <div className="container mx-auto px-4 py-8">
            <div className='max-w-2xl mx-auto'>
                <div className='flex items-center justify-between mb-6'>
                <Link to="/" className='btn btn-ghost'>
                    <ArrowLeftIcon className='h-5 w-5'/>
                        Back
                </Link>
                <button onClick={handleDelete} className='btn btn-error btn-outline'>
                    <Trash2Icon className='h-5 w-5'/>
                        Delete
                </button>
                </div>
                <div className='card bg-base-100'>
                    <div className="card-body">
                        <div className="form-control mb-4">
                            <label className='label'>
                                <span className='label-text'>Title</span>
                            </label>
                            <input type="text"
                             value={note.title}
                             placeholder='Enter note title'
                             className='input input-bordered'
                             onChange={(e) => setnotes({ ...note, title:e.target.value})} />
                        </div>
                        <div className="form-control mb-4">
                            <label className='label'>
                                <span className='label-text'>Content</span>
                            </label>
                            <textarea 
                             value={note.content}
                             placeholder='Enter note content'
                             className='textarea textarea-bordered'
                             onChange={(e) => setnotes({ ...note, content:e.target.value})}
                            />
                        </div>
                        <div className="card-actions justify-end">
                            <button className='btn btn-outline' disabled={saving} onClick={handleSave}>
                                {saving ? "Saving Changes..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default NoteDetail;