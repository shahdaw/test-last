import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.patch("https://ecommerce-node4.onrender.com/auth/forgotPassword", {
        email,
        password,
        code,
      });

      toast.success("تم تعيين كلمة المرور بنجاح");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء تعيين كلمة المرور");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">إعادة تعيين كلمة المرور</h2>
      <form onSubmit={handleResetPassword}>
        <label htmlFor="email">البريد الإلكتروني</label>
        <input
          type="email"
          id="email"
          className="form-control my-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="code">الكود</label>
        <input
          type="text"
          id="code"
          className="form-control my-2"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <label htmlFor="password">كلمة المرور الجديدة</label>
        <input
          type="password"
          id="password"
          className="form-control my-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary mt-3">تحديث كلمة المرور</button>
      </form>
    </div>
  );
}
