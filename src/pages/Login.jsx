import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = (path) => {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const handleAuthSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setErrorMsg('Please input values across operational parameters.');
            return;
        }
        loginUser({ email: formData.email, name: 'Verified Account' });
        navigate('/');
    };

    return (
        <div className="max-w-md mx-auto my-16 bg-white border border-slate-200 shadow-xl rounded-2xl p-8">
            <h2 className="text-3xl font-extrabold text-slate-900 text-center tracking-tight mb-6">System Access</h2>
            {errorMsg && (
                <div className="mb-4 text-sm text-rose-600 bg-rose-50 border border-rose-200 px-4 py-2 rounded-lg">
                    {errorMsg}
                </div>
            )}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs uppercase font-bold text-slate-700 tracking-wider mb-2">Email Address</label>
                    <input type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 bg-white" />
                </div>
                <div>
                    <label className="block text-xs uppercase font-bold text-slate-700 tracking-wider mb-2">Security Key</label>
                    <input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 bg-white" />
                </div>
                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors border-none cursor-pointer">Access Portal</button>
            </form>
            <div className="mt-6 text-center text-sm text-slate-600">
                Don't have an account? <button onClick={() => navigate('/register')} className="text-emerald-600 font-semibold hover:underline bg-transparent border-none cursor-pointer">Register Here</button>
            </div>
        </div>
    );
};

export default Login;