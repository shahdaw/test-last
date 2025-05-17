{/*
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Products() {

  const [products, setProducts] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {

    try {
      const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products?page=1&limit=10`);

      setProducts(data.products);
    }

    catch (error) {
      console.log(error);
    }

    finally {
      setIsLoading(false);
    }

  }

  useEffect(() => {
    getProducts();
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <section className='products'>
      <h2>All Products</h2>
      <div className='row'>

        {products.map(product =>

          <div className='col-md-4' key={product._id}>
            <div className='product'>
              <img src={product.mainImage.secure_url} />
              <h2>{product.name}</h2>
              <Link to={`/product/${product._id}`}>Details</Link>
            </div>
          </div>

        )}

      </div>

    </section>
  )




}

/*}
