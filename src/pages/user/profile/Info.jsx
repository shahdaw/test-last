import React, { useContext } from 'react'
import { UserContext } from '../../../components/user/context/UserContext';

export default function Info() {

   const {user,loading} = useContext(UserContext);


  return (
    <div> Info
      <h2>Name is : {user.userName}</h2>
      <h3>Email is: {user.email}</h3>
    </div>


  )
}






