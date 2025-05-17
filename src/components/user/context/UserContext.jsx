
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({children})=>{

const [user,setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {

            const token = localStorage.getItem("userToken");

            try{
            const response = await axios.get("https://ecommerce-node4.onrender.com/user/profile",

                {
                    headers: {
                        Authorization: `Tariq__${token}`,
                    }
                }
            );

            setUser(response.data.user);
        } catch (e) {
            console.log("error fetching user data", e);
            setUser(null);
        } finally {
            console.log("finally");
            setLoading(false);
        }

    }

return <UserContext.Provider value={{ user, loading, setUser}}>

    {children}
</UserContext.Provider>

}

export default UserContextProvider;
  
