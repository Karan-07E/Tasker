import { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'react-hot-toast';
import { LoaderCircleIcon, MailIcon } from 'lucide-react';
import api from '../lib/axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetToken, setResetToken] = useState('');
    const [tokenSent, setTokenSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/auth/forgot-password', { email });
            setResetToken(response.data.resetToken);
            setTokenSent(true);
            toast.success('Password reset instructions sent!', {
                position: 'top-center'
            });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send reset instructions', {
                position: 'top-center'
            });
        } finally {
            setLoading(false);
        }
    };

    if (tokenSent) {
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
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <MailIcon className="h-16 w-16 mx-auto text-success" />
                            </div>
                            <h1 className="card-title text-2xl text-center mb-4">Check Your Email</h1>
                            <p className="text-gray-600 mb-6">
                                We've sent password reset instructions to <strong>{email}</strong>
                            </p>
                            
                            {/* For demo purposes - showing the reset token */}
                            <div className="alert alert-info mb-4">
                                <div className="text-sm">
                                    <strong>Demo Mode:</strong> Your reset token is:
                                    <br />
                                    <code className="text-xs break-all">{resetToken}</code>
                                    <br />
                                    <Link 
                                        to={`/reset-password/${resetToken}`} 
                                        className="link link-primary"
                                    >
                                        Click here to reset your password
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Link to="/login" className="btn btn-primary w-full">
                                    Back to Login
                                </Link>
                                <button 
                                    onClick={() => setTokenSent(false)} 
                                    className="btn btn-ghost w-full"
                                >
                                    Resend Instructions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <header className='bg-base-300 border-b border-base-content/10'>
                <div className='mx-auto max-w-6xl p-4'>
                    <div className='flex items-center justify-between'>
                        <Link to="/" className='text-3xl font-bold text-primary font-mono tracking-tight'>
                            Tasker
                        </Link>
                    </div>
                </div>
            </header>
            
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h1 className="card-title text-2xl text-center mb-6">Forgot Password</h1>
                        <p className="text-center text-gray-600 mb-6">
                            Enter your email address and we'll send you instructions to reset your password.
                        </p>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email Address</span>
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input input-bordered"
                                    placeholder="Enter your email"
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
                                    'Send Reset Instructions'
                                )}
                            </button>
                        </form>

                        <div className="text-center mt-6 space-y-2">
                            <Link to="/login" className="link link-primary block">
                                Back to Login
                            </Link>
                            <p className="text-sm">
                                Don't have an account? 
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

export default ForgotPassword;
