import { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            getCurrentUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    const getCurrentUser = async () => {
        try {
            const response = await api.get('/auth/me');
            setUser(response.data.user);
        } catch (error) {
            console.error('Error getting current user:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token: newToken, user: userData } = response.data;
            
            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(userData);
            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || error.message || 'Login failed' 
            };
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await api.post('/auth/register', { username, email, password });
            const { token: newToken, user: userData } = response.data;
            
            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(userData);
            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.message || error.message || 'Registration failed' 
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
