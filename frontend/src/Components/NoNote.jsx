import { Link } from "react-router";
import { NotebookIcon } from "lucide-react";

const NoNote = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-e-md mx-auto text-center">
        <div className="bg-primary/10 rounded-full p-8">
            <NotebookIcon className="size-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">No Notes Created Yet</h3>
        <p className="text-base-content/70">Create your first note Today!!!</p>
        <Link to="/create" className="btn btn-primary">Create Note</Link>
    </div>
  );
};

export default NoNote;