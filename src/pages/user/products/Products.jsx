import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate'; // استيراد مكتبة الـ Pagination
import './Products.css';


export default function Products() {
  const [products, setProducts] = useState([]);  // تخزين المنتجات
  const [isLoading, setIsLoading] = useState(true);  // حالة تحميل المنتجات
  const [currentPage, setCurrentPage] = useState(1);  // الحالة لتحديد الصفحة الحالية
  const [paginatedProducts, setPaginatedProducts] = useState([]);  // الحالة لتخزين المنتجات المصفاة حسب الصفحة

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products?page=1&limit=10`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    // تقسيم المنتجات عبر الصفحات
    const productsPerPage = 4; // عدد المنتجات في كل صفحة (باستثناء الصفحة الأخيرة)
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // تحديد المنتجات المعروضة بناءً على الصفحة الحالية
    setPaginatedProducts(products.slice(startIndex, endIndex));
  }, [currentPage, products]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1; // الصفحات تبدأ من 0 في الـ pagination
    setCurrentPage(selectedPage); // تحديث الصفحة الحالية
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className='products'>
      <h2>All Products</h2>
      <div className='row'>
        {paginatedProducts.map(product => (
          <div className='col-md-4' key={product._id}>
            <div className='product'>
              <img src={product.mainImage.secure_url} alt={product.name} />
              <h2>{product.name}</h2>
              <Link to={`/product/${product._id}`}>Details</Link>
            </div>
          </div>
        ))}
      </div>

      {/* إضافة الـ Pagination هنا */}
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(products.length / 4)} // إجمالي عدد الصفحات بناءً على عدد المنتجات
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </section>
  );
}
