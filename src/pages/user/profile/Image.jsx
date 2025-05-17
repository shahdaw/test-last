import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserContext } from '../../../components/user/context/UserContext';


export default function Image() {

   const { register,  handleSubmit, formState: { errors } } = useForm();
   const {user,loading} = useContext(UserContext);
   const [isLoading, setIsLoading] = useState(false);
   const [imagePreview, setImagePreview] = useState(null);

const updateImage = async (data)=>{
    const token = localStorage.getItem("userToken");
    const formData = new FormData();
    formData.append("image",data.image[0]);
    console.log(formData);
    try{
        setIsLoading(true);
        const response = await axios.put("https://ecommerce-node4.onrender.com/user/update-image",formData,
            {
                headers: {
                    Authorization: `Tariq__${token}`,
                }
            }
        );

        if(response.status == 200) {

            toast.success("image updated successfully");
            
            }
            
            console.log(response);
            
            }catch(err){
            
            toast.error("Error updating image");
            
            console.log(err);
            
            }finally{
            
            setIsLoading(false);
            
            }
        }
            
            const handleImageChange = (event)=>{
            
            const file = event.target.files[0];
            
            setImagePreview(URL.createObjectURL(file));
            
            }
            
            if(isLoading) return <h2> loading... </h2> 


  return (
    <Form onSubmit={handleSubmit(updateImage)} encType='multipart/form-data'>
      <Form.Group  controlId="updateImage">
        <Form.Label>Update profile picture</Form.Label>
        <Form.Control type="file" {...register('image')} onChange={handleImageChange} />
      </Form.Group>
     {imagePreview ? <img src={imagePreview} width={200}/> : <img src={user?.image?.secure_url} width={200}/> } 
      <Button  type="submit"> Update </Button>
      </Form>
  )
}
  

