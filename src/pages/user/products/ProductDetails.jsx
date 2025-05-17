import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
import { Slide, toast } from 'react-toastify';
import { CartContext } from '../../../components/user/context/CartContext.jsx';

export default function ProductDetails() {

  const { productId } = useParams();
  const navigate = useNavigate();
  const { cartCount, setCartCount } = useContext(CartContext);

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products/${productId}`);
      console.log(data.product);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const addProductToCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post('https://ecommerce-node4.onrender.com/cart',
        { productId: productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );

      if (response.status === 201) {
        toast.info('Product added successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
        setCartCount(cartCount + 1);
        navigate('/cart');
      }

    } catch (error) {
      console.log("error", error);
    }
  }

  const submitReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");

    try {
      const response = await axios.post(
        `https://ecommerce-node4.onrender.com/products/${productId}/review`,
        { comment, rating },
        { headers: { Authorization: `Tariq__${token}` } }
      );

      if (response.data.message === "success") {
        toast.success("تم إضافة التقييم بنجاح ✨", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "colored",
        });
        setComment('');
        setRating(5);
        // إعادة تحميل المنتج بالتقييم الجديد
        getProducts();
      }

    } catch (error) {
      console.error("فشل في إرسال التقييم", error);
      toast.error("فشل في إرسال التقييم ❌", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "colored",
      });
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <section className='product' style={{ padding: "20px" }}>
      <Card>
        <Card.Img variant="top" src={product.mainImage?.secure_url} className='w-25 mx-auto' />
        <Card.Body>
          <Card.Title className='text-center'>{product.name}</Card.Title>
          <Card.Text className='text-center'>
            {product.description}
          </Card.Text>

          <div className='d-flex justify-content-center mb-3'>
            <Button onClick={addProductToCart} className='btn btn-primary'>Add to cart</Button>
          </div>

          {/* نموذج إرسال الريفيو */}
          <Form onSubmit={submitReview}>
            <Form.Group className="mb-3">
              <Form.Label>تعليقك</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>التقييم (من 1 إلى 5)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
              />
            </Form.Group>

            <div className='d-flex justify-content-center'>
              <Button variant="success" type="submit">
                إرسال التقييم
              </Button>
            </div>
          </Form>

          {/* عرض الريفيوز */}
          <div className='mt-5'>
            <h4 className='mb-4'>: التقييمات</h4>
            {product.reviews?.length > 0 ? (
              product.reviews.map((review, index) => (
                <Card key={index} className='mb-3 p-3'>
                  <Card.Title className="d-flex align-items-center gap-2">
                    <span className="text-warning">⭐</span>
                    <span>{review.rating} / 5</span>
                  </Card.Title>
                  <Card.Text>{review.comment}</Card.Text>
                  <Card.Footer className="text-muted">
                     {review.createdBy?.userName || 'مستخدم مجهول'} : بواسطة
                  </Card.Footer>
                </Card>
              ))
            ) : (
              <p className='text-center'>لا توجد تقييمات بعد.</p>
            )}
          </div>

        </Card.Body>
      </Card>
    </section>
  )
}
