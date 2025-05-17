import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const { data } = await axios.get("https://ecommerce-node4.onrender.com/order", {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setOrders(data.orders);
    } catch (error) {
      console.error("فشل في جلب الطلبات", error);
    }
  };

  const cancelOrder = async (orderId) => {
    const token = localStorage.getItem("userToken");
    try {
      await axios.patch(`https://ecommerce-node4.onrender.com/order/cancel/${orderId}`, {}, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      getOrders(); // نحدث القائمة بعد الإلغاء
    } catch (error) {
      console.error("فشل في إلغاء الطلب", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">طلباتك</h2>
      <Row className="g-4">
        {orders.map((order) => (
          <Col md={6} lg={4} key={order._id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>رقم الطلب: {order._id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  الحالة: {order.status}
                </Card.Subtitle>
                <p><strong>العنوان:</strong> {order.address}</p>
                <p><strong>رقم الهاتف:</strong> {order.phoneNumber}</p>
                <p><strong>السعر الإجمالي:</strong> {order.finalPrice}$</p>
                <p><strong>تاريخ الإنشاء:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <hr />
                {order.cartItems?.map((item) => (
                  <div key={item._id} className="mb-3">
                    <Card.Img
                      variant="top"
                      src={item.product.mainImage.secure_url}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <p className="mt-2"><strong>اسم المنتج:</strong> {item.product.name}</p>
                    <p><strong>السعر:</strong> {item.price}$</p>
                    <p><strong>الكمية:</strong> {item.quantity}</p>
                  </div>
                ))}
                {/* زر إلغاء الطلب إذا كان قيد الانتظار */}
                {order.status === "pending" && (
                  <Button
                    variant="danger"
                    className="mt-2"
                    onClick={() => cancelOrder(order._id)}
                  >
                    إلغاء الطلب
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}