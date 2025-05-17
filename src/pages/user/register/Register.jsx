import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Slide, toast } from 'react-toastify';
import { useState } from 'react';


export default function Register() {
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const registerUser = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://ecommerce-node4.onrender.com/auth/signup`, value);
      if (response.status == 201) {
        toast.info('please check your email', {
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
        navigate('/login');
      }
      console.log(response);
    } catch (error) {
      if (error.response.status == 409) {
        setServerError("email already in use");
      } else {
        setServerError("server error");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>

      <Form onSubmit={handleSubmit(registerUser)}>
        {serverError ? <div className='text-danger'>{serverError}</div> : null}
        <FloatingLabel
          controlId="floatingInput"
          label="user name"
          className="mb-3"
        >
          <Form.Control type="text" placeholder="" {...register("userName", { required: "username is required" })} />
          {errors.userName ? <div className='text-danger'>{errors.userName.message}</div> : null}
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control type="email" placeholder=""  {...register("email", { required: "email is required" })} />
          {errors.email ? <div className='text-danger'>{errors.email.message}</div> : null}
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="password"
          className="mb-3"
        >
          <Form.Control type="password" placeholder="" {...register("password", { required: "password is required" })} />
          {errors.password ? <div className='text-danger'>{errors.password.message}</div> : null}
        </FloatingLabel>

        <Button type='submit' variant="primary"
          disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </Form>

    </>
  )
}
