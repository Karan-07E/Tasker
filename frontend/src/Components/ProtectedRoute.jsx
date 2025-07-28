import { useAuth } from '../contexts/AuthContext';
import { LoaderCircleIcon } from 'lucide-react';
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderCircleIcon className="animate-spin size-10" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
