import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Slide, toast } from 'react-toastify';
import { useState } from 'react';
import { Link } from "react-router-dom";


export default function Login() {
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const registerUser = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://ecommerce-node4.onrender.com/auth/signin`, value);
      if (response.status == 200) {
        localStorage.setItem("userToken", response.data.token);
        navigate('/');
      }
      console.log(response);

    } catch (error) {
      console.log(error);
      setServerError(error.response.data.message);

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
          {isLoading ? "Loading..." : "Login"}
        </Button>

        <p style={{ marginTop: "10px" }}>
          نسيت كلمة المرور؟{" "}
          <Link to="/auth/forgot-password" style={{ color: "blue" }}>
            اضغط هنا
          </Link>
        </p>


      </Form>

    </>
  )
}
