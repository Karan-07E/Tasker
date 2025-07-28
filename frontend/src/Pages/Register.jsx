import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { LoaderCircleIcon } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const result = await register(formData.username, formData.email, formData.password);
            
            if (result?.success) {
                toast.success('Registration successful!', {
                        position: 'top-center'
                    });
                navigate('/');
            } else {
                toast.error(result.error, {
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
                        <h1 className="card-title text-2xl text-center mb-6">Register</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="input input-bordered"
                                required
                                minLength={3}
                                maxLength={20}
                            />
                        </div>

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
                                minLength={6}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
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
                                'Register'
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <p>Already have an account? 
                            <Link to="/login" className="link link-primary ml-1">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default Register;
