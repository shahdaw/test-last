import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Categories() {

  const [categories, setCategories] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {

    try {
      const { data } = await axios.get(`https://ecommerce-node4.onrender.com/categories/active`);

      setCategories(data.categories);
    }

    catch (error) {
      console.log(error);
    }

    finally {
      setIsLoading(false);
    }

  }

  useEffect(() => {
    getCategories();
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <section className='categories'>
      <h2>Categories</h2>
      <div className='row'>

        {categories.map(category =>

          <div className='col-md-4' key={category._id}>
            <Link to={`/categories/${category._id}`}>
            <div className='category'>
              <img src={category.image.secure_url} />
            </div>
            </Link>
          </div>

        )}

      </div>

    </section>
  )


}
