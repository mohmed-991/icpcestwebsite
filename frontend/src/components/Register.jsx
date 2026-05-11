import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true; 

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', department: '', codeforcesHandle: '', password: '', password_confirmation: ''
    });
    const [isOAuth, setIsOAuth] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const handle = params.get('handle');
        const name = params.get('name');
        const email = params.get('email');

        if (handle) {
            setFormData(prev => ({
                ...prev,
                codeforcesHandle: handle,
                name: name || '',
                email: email || ''
            }));
            setIsOAuth(true);
        } else {
            axios.get('http://localhost:8000/api/oauth/data')
                .then(res => {
                    if (res.data.handle) {
                        setFormData(prev => ({
                            ...prev,
                            name: res.data.name || '',
                            email: res.data.email || '',
                            codeforcesHandle: res.data.handle || ''
                        }));
                        setIsOAuth(true);
                    }
                }).catch(() => console.log("Manual Mode"));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/register', formData);
            alert("تم التسجيل بنجاح!");
            window.location.href = '/dashboard';
        } catch (err) {
            alert(err.response?.data?.message || "خطأ في التسجيل");
        }
    };

    const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #eee' }}>
            <h2 style={{ textAlign: 'center' }}>{isOAuth ? 'أكمل بياناتك' : 'إنشاء حساب جديد'}</h2>
            <form onSubmit={handleSubmit}>
                <input style={inputStyle} type="text" name="name" placeholder="الاسم الكامل" value={formData.name} onChange={handleChange} required />
                <input style={inputStyle} type="email" name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleChange} required />
                <input style={inputStyle} type="text" name="phone" placeholder="رقم الهاتف" value={formData.phone} onChange={handleChange} required />
                <input style={inputStyle} type="text" name="department" placeholder="القسم" value={formData.department} onChange={handleChange} required />
                <input style={inputStyle} type="text" name="codeforcesHandle" placeholder="Handle" value={formData.codeforcesHandle} onChange={handleChange} readOnly={isOAuth} required />
                {!isOAuth && (
                    <>
                        <input style={inputStyle} type="password" name="password" placeholder="كلمة المرور" onChange={handleChange} required />
                        <input style={inputStyle} type="password" name="password_confirmation" placeholder="تأكيد كلمة المرور" onChange={handleChange} required />
                    </>
                )}
                <button type="submit" style={{ width: '100%', padding: '12px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>إتمام التسجيل</button>
            </form>
            {!isOAuth && (
                <button
                    onClick={() => (window.location.href = 'http://localhost:8000/api/oauth/codeforces')}
                    style={{ width: '100%', marginTop: '10px', padding: '10px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                    Continue with Codeforces
                </button>
            )}

        </div>
    );
};

export default Register;