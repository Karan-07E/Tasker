import { Link } from "react-router";
import { NotebookIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const NoNote = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
        <div className="bg-primary/10 rounded-full p-8">
            <NotebookIcon className="size-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-white">No Notes Created Yet</h3>
        <p className="text-gray-300">
          Hey {user?.username}! Ready to capture your thoughts? Create your first note and start your journey!
        </p>
        <Link to="/create" className="btn btn-primary">Create Your First Note</Link>
    </div>
  );
};

export default NoNote;