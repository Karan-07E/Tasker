import Navbar from '../Components/Navbar'
import { useEffect, useState } from 'react';
import RatelimitUI from '../Components/RatelimitUI';
import { toast } from 'react-hot-toast'; // for toast notifications
import NoteCard from '../Components/NoteCard';
import api from '../lib/axios'; // Importing the axios instance
import NoNote from '../Components/NoNote';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
    const [IsRateLimited, setIsRateLimited] = useState(false);
    const [notes, setnotes] = useState([]);
    const [loading, setloading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchNotes = async() => {
        try {
                const res = await api.get('/notes');
                setnotes(res.data);
                setIsRateLimited(false);
            }
        catch (error) {
            console.error("Error fetching Notes");
            if(error.response.status === 429){
                setIsRateLimited(true);
            } else {
                toast.error("Failed to Load Notes");
            }
        } finally {
            setloading(false);
        }
        };
        fetchNotes();
    }, []);

  return (
    <div className='min-h-screen'>
        <Navbar />
        {IsRateLimited && <RatelimitUI />}
        <div className='max-w-7xl mx-auto p-4 mt-6'>
            <div className='mb-6'>
                <h1 className='text-2xl font-bold text-white mb-2 text-center'>
                    Welcome, {user?.username}! 👋
                </h1>
                <p className='text-gray-300 text-center mb-2'>
                    {notes.length > 0 ? `You have ${notes.length} note${notes.length === 1 ? '' : 's'}` : 'Ready to create your first note?'}
                </p>
            </div>
            
            {loading && <div className='text-center text-outline py-10'>Loading Notes...</div>}
            {notes.length === 0 && !IsRateLimited && !loading && <NoNote />}
            {notes.length > 0 && !IsRateLimited && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {notes.map((note) =>
                       <NoteCard key={note._id} note={note} setnotes={setnotes}/>
                    )}
                </div>
            )}

        </div>
    </div>
  )
}

export default HomePage