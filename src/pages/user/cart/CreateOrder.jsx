import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [couponName, setCouponName] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getCartItems = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.get("https://ecommerce-node4.onrender.com/cart", {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCartItems(response.data.products);
    } catch (err) {
      setError("فشل في تحميل محتوى السلة");
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.post(
        "https://ecommerce-node4.onrender.com/order",
        {
          address,
          phone,
          couponName,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      navigate("/profile/orders");
    } catch (err) {
      setError(err.response?.data?.message || "فشل إنشاء الطلب");
    }
  };

  return (
    <div className="container">
      <h2>إنشاء طلب جديد</h2>

      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            {item.details.name} - الكمية: {item.quantity}
          </li>
        ))}
      </ul>

      <form onSubmit={handleCreateOrder}>
        <input
          type="text"
          placeholder="العنوان"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="رقم الهاتف"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="اسم الكوبون (اختياري)"
          value={couponName}
          onChange={(e) => setCouponName(e.target.value)}
        />
        <button type="submit">تأكيد الطلب</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateOrder;
