
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


export default function Category() {

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

return(
    <Swiper
    modules={[Navigation]}
      spaceBetween={50}
      navigation
      loop={true}
      slidesPerView={3.3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {categories.map(category=> <SwiperSlide key={category._id}>
        <img src={category?.image?.secure_url} />
      </SwiperSlide>)}
  
    </Swiper>
)

}