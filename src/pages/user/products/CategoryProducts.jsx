import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'

export default function CategoryProducts() {

    const { categoryId } = useParams();

    const [products, setProducts] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    const getProducts = async () => {

        try {
            const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products/category/${categoryId}`);

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

    console.log(categoryId);

    if (isLoading) {
        return <h2>Loading...</h2>
    }


    return (

        <section className='products'>
            <h2> Products</h2>
            <div className='row'>

                {products.map(product =>

                    <div className='col-md-4' key={product._id}>
                        <div className='product'>
                            <img src={product.mainImage.secure_url} />
                            <h2>{product.name}</h2>
                        </div>
                    </div>

                )}

            </div>

        </section>

    )
}
