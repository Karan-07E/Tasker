import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react'
import { Link } from 'react-router'; // Importing Link for navigation
import { toast } from 'react-hot-toast'; // for toast notifications
import { useNavigate } from 'react-router'; // Hook to programmatically navigate
import api from '../lib/axios';

const CreateNote = () => {
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [loading, setloading] = useState(false);
    const navigate = useNavigate(); // Hook to programmatically navigate to home page

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!Title.trim() || !Content.trim()){   //trim() is used to remove white spaces.
            toast.error("Title and Content are Required");
            return;
        }
        setloading(true);
        try {
            await api.post('/notes', {
                title: Title,
                content: Content
            });
            toast.success("Note Created");
            navigate("/"); 
        } catch (error) {
            toast.error("Failed to Create Note");
        } finally {
            setloading(false); 
            setTitle("");
            setContent("");    
        }
    }
  return ( 
    <div className='min-h-screen bg-base-200'>
        <div className='container mx-auto px-4 py-8'>
            <div className='max-w-2xl mx-auto'>
                <Link to={"/"} className='btn btn-ghost mb-6'>
                  <ArrowLeftIcon className='size-5'/>
                    Back
                </Link>
                <div className='card bg-base-100'>
                    <div className='card-body'>
                        <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'>Title</span>
                                </label>
                                <input type="text" 
                                    className='input input-bordered'
                                    placeholder='Enter note title'
                                    value={Title}
                                    onChange={(e) => setTitle(e.target.value)} 
                                />
                            </div>
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'>Content</span>
                                </label>
                                <textarea 
                                    className='textarea textarea-bordered'
                                    placeholder='Enter note Content'
                                    value={Content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <div className='card-actions justify-end'>
                                <button className='btn btn-outline' type='submit' disabled={loading}>
                                    {loading ? "Creating..." : "Create"}
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

export default CreateNote;