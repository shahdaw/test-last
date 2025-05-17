import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


export default function Cart() {
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    const getCart = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const response = await axios.get("https://ecommerce-node4.onrender.com/cart", {
                headers: {
                    Authorization: `Tariq__${token}`,
                }
            });
            setCart(response.data.products);
        } catch (error) {
            console.log("error", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCart();
    }, []);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    const incQty = async (productId) => {
        const token = localStorage.getItem("userToken");
        await axios.patch("https://ecommerce-node4.onrender.com/cart/incraseQuantity",
            { productId },
            { headers: { Authorization: `Tariq__${token}` } }
        );
        setCart(prev => prev.map(item =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decQty = async (productId) => {
        const token = localStorage.getItem("userToken");
        await axios.patch("https://ecommerce-node4.onrender.com/cart/decraseQuantity",
            { productId },
            { headers: { Authorization: `Tariq__${token}` } }
        );
        setCart(prev => prev.map(item =>
            item.productId === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ));
    };

    const removeItem = async (productId) => {
        const token = localStorage.getItem("userToken");
        try {
            const response = await axios.patch(
                "https://ecommerce-node4.onrender.com/cart/removeItem",
                { productId },
                { headers: { Authorization: `Tariq__${token}` } }
            );
            if (response.data.message === "success") {
                getCart();
            }
        } catch (error) {
            console.error("فشل في إزالة المنتج من السلة", error);
        }
    };

    const clearCart = async () => {
        const token = localStorage.getItem("userToken");
        try {
            const response = await axios.patch(
                "https://ecommerce-node4.onrender.com/cart/clear",
                {

                },
                {
                     headers: { 
                        Authorization: `Tariq__${token}`,
                     }
                     }
            );
            if (response.data.message === "success") {
                getCart();
                console.log("تم مسح السلة بنجاح");
            }
        } catch (error) {
            console.error("فشل في مسح السلة", error);
        }
    };

    return (
        <section className='cart' style={{ padding: "20px" }}>
            <h2 className='text-center mb-4'>Your Cart</h2>

            {/* جدول السلة */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item =>
                        <tr key={item._id}>
                            <td><img src={item.details.mainImage.secure_url} width="50px" alt="Product" /></td>
                            <td>{item.details.name}</td>
                            <td>{item.details.finalPrice}$</td>
                            <td>
                                <div className='d-flex align-items-center justify-content-center gap-2'>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => decQty(item.productId)}
                                    >
                                        -
                                    </Button>
                                    {item.quantity}
                                    <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() => incQty(item.productId)}
                                    >
                                        +
                                    </Button>
                                </div>
                            </td>
                            <td>{item.quantity * item.details.finalPrice}$</td>
                            <td>
                                <Button
                                    onClick={() => removeItem(item.productId)}
                                    variant="danger"
                                    size="sm"
                                >
                                    Remove item
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* زر مسح السلة في الأسفل */}
            <div className="d-flex justify-content-center mt-4">
                <Button
                    onClick={clearCart}
                    style={{
                        backgroundColor: "#dc3545",
                        border: "none",
                        padding: "10px 25px",
                        borderRadius: "8px",
                        fontWeight: "bold"
                    }}
                >
                    Clear cart
                </Button>
            </div>

            {cart.length > 0 && (
  <div className="d-flex justify-content-center mt-3">
    <Button
      onClick={() => navigate("/create-order")}
      style={{
        backgroundColor: "green",
        border: "none",
        padding: "10px 25px",
        borderRadius: "8px",
        fontWeight: "bold"
      }}
    >
      إنشاء الطلب
    </Button>
  </div>
)}


        </section>
    );
}
