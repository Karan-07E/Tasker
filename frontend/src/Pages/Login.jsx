import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { LoaderCircleIcon } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await login(formData.email, formData.password);
            if (result?.success) {
                toast.success('Login successful!', {
                    position: 'top-center'
                });
                navigate("/");
            } else {
                toast.error(result?.message || 'Login failed. Please try again.', {
                    position: 'top-center'
                });
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.', {
                position: 'top-center'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <header className='bg-base-300 border-b border-base-content/10'>
                    <div className='mx-auto max-w-6xl p-4'>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>Tasker</h1>
                        </div>
                    </div>
            </header>
            
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h1 className="card-title text-2xl text-center mb-6">Login</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <LoaderCircleIcon className="animate-spin h-5 w-5" />
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-4 space-y-2">
                        <Link to="/forgot-password" className="link link-primary block">
                            Forgot your password?
                        </Link>
                        <p>Don't have an account? 
                            <Link to="/register" className="link link-primary ml-1">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;
