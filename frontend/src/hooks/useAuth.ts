import { api } from '../services/api.js';

export const useAuth = () => {
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.login(email, password);
      // Store token in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string, role: string): Promise<void> => {
    try {
      const response = await api.signup(name, email, password, role);
      // Store token in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return { login, signup, logout, getToken, getUser, isAuthenticated };
};
