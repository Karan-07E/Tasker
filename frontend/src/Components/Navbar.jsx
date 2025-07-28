import React from 'react'
import { Link } from 'react-router'; // Importing Link for navigation
import { PlusIcon, LogOutIcon, UserIcon } from 'lucide-react'; // Importing icons from lucide
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
  <header className='bg-base-300 border-b border-base-content/10'>
    <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
          <Link to="/" className='text-3xl font-bold text-primary font-mono tracking-tight'>
            Tasker
          </Link>
          
          {isAuthenticated ? (
            <div className='flex items-center gap-4'>
              <Link to={"/create"} className='btn btn-primary'>
                <PlusIcon className='size-5'/>
                <span>New Note</span>
              </Link>
              
              <div className='dropdown dropdown-end'>
                <div tabIndex={0} role="button" className='btn btn-ghost btn-circle'>
                  <UserIcon className='size-5'/>
                </div>
                <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'>
                  <li className='p-2'>
                    <span className='text-sm text-gray-500'>Signed in as:</span>
                    <span className='font-semibold'>{user?.username}</span>
                  </li>
                  <li>
                    <button onClick={handleLogout} className='text-error'>
                      <LogOutIcon className='size-4'/>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <Link to="/login" className='btn btn-outline'>
                Login
              </Link>
              <Link to="/register" className='btn btn-primary'>
                Register
              </Link>
            </div>
          )}
        </div>
    </div>
  </header>
  );
}

export default Navbar