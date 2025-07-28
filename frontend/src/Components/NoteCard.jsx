import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"; // Importing Link for navigation
import { formatDate } from "../lib/utils.js"; // Importing utility function for date formatting
import api from "../lib/axios.js";
import { toast } from "react-hot-toast"; // for toast notifications

const NoteCard = ({note, setnotes}) => {

  const handleDelete = async (e, id) => {
      e.preventDefault();
      if(!window.confirm('Are You Sure You want to delete this Note?')) return;
      try {
        await api.delete(`/notes/${id}`);
        toast.success("Note Deleted Successfully");
        setnotes((prevNotes) => prevNotes.filter(note => note._id !== id));
      } catch (error) {
        console.log("Error deleting note:", error);
        toast.error("Failed to Delete Note");
      }
  }

  return (
    <Link to = {`/note/${note._id}`} 
        className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#BA8E23]'>
        <div className="card-body">
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>

          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
               {formatDate(note.createdAt)}
            </span>
            <div className="flex items-center gap-1">
                <PenSquareIcon className="size-4" />
                <button className="btn btn-ghost text-error" onClick={(e) => handleDelete(e, note._id)}>
                    <Trash2Icon className="size-4"/>
                </button>
            </div>
          </div>
        </div>
    </Link>
  )
}

export default NoteCard