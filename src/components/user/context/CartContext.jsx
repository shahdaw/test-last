import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({children})=>{

const [cartCount,setCartCount] = useState(0);

useEffect(() => {
        getCart();
    }, [])

    const getCart = async () => {

            const token = localStorage.getItem("userToken");
            const response = await axios.get("https://ecommerce-node4.onrender.com/cart",

                {
                    headers: {
                        Authorization: `Tariq__${token}`,
                    }
                }


            );

            setCartCount(response.data.count);
        }

return <CartContext.Provider value={{ cartCount,setCartCount}}>

    {children}
</CartContext.Provider>

}

export default CartContextProvider;