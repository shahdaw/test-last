import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const sendCode = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        'https://ecommerce-node4.onrender.com/auth/sendcode',
        {
          email: email,
        }
      );

      toast.success('تم إرسال الكود إلى بريدك الإلكتروني');
      navigate('/auth/reset-password');
    } catch (error) {
      toast.error(error.response?.data?.message || 'حدث خطأ أثناء الإرسال');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">نسيت كلمة المرور</h2>
      <form onSubmit={sendCode}>
        <label htmlFor="email">البريد الإلكتروني</label>
        <input
          type="email"
          id="email"
          className="form-control my-3"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          إرسال الكود
        </button>
      </form>
    </div>
  );
}
