import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', photoUrl: '', password: '' });
    const [feedback, setFeedback] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = (path) => {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordPattern.test(formData.password)) {
            setIsSuccess(false);
            setFeedback('Password criteria mismatch: minimum 6 items containing structural upper and lower patterns.');
            return;
        }
        setIsSuccess(true);
        setFeedback('Registration succeeded! Redirecting to login...');
        setTimeout(() => {
            navigate('/login');
        }, 1500);
    };

    return (
        <div className="max-w-md mx-auto my-16 bg-white border border-slate-200 shadow-xl rounded-2xl p-8">
            <h2 className="text-3xl font-extrabold text-slate-900 text-center tracking-tight mb-6">Create Account</h2>
            {feedback && (
                <div className={`mb-4 text-sm px-4 py-2 rounded-lg border ${isSuccess ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-rose-600 bg-rose-50 border-rose-200'}`}>
                    {feedback}
                </div>
            )}
            <form onSubmit={handleRegistration} className="space-y-4">
                <div>
                    <label className="block text-xs uppercase font-bold text-slate-700 tracking-wider mb-2">Full Profile Name</label>
                    <input type="text" onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 bg-white" />
                </div>
                <div>
                    <label className="block text-xs uppercase font-bold text-slate-700 tracking-wider mb-2">Target Email</label>
                    <input type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 bg-white" />
                </div>
                <div>
                    <label className="block text-xs uppercase font-bold text-slate-700 tracking-wider mb-2">Password Matrix</label>
                    <input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 bg-white" />
                </div>
                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors border-none cursor-pointer">Register Profile</button>
            </form>
            <div className="mt-6 text-center text-sm text-slate-600">
                Already have an account? <button onClick={() => navigate('/login')} className="text-emerald-600 font-semibold hover:underline bg-transparent border-none cursor-pointer">Login Instead</button>
            </div>
        </div>
    );
};

export default Register;