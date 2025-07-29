import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { toast } from 'react-hot-toast';
import { LoaderCircleIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../lib/axios';

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();
    const { login } = useAuth();

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
            const response = await api.post(`/auth/reset-password/${token}`, {
                password: formData.password
            });

            // Auto-login the user after successful password reset
            localStorage.setItem('token', response.data.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            
            toast.success('Password reset successful! You are now logged in.', {
                position: 'top-center'
            });
            
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password', {
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
                        <h1 className="card-title text-2xl text-center mb-6">Reset Password</h1>
                        <p className="text-center text-gray-600 mb-6">
                            Enter your new password below.
                        </p>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">New Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    required
                                    minLength={6}
                                    placeholder="Enter new password"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm New Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="input input-bordered"
                                    required
                                    placeholder="Confirm new password"
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
                                    'Reset Password'
                                )}
                            </button>
                        </form>

                        <div className="text-center mt-6">
                            <Link to="/login" className="link link-primary">
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
