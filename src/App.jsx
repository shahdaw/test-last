import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Register from './pages/user/register/Register';
import Login from "./pages/user/login/Login";
import { ToastContainer } from 'react-toastify';
import UserLayout from './layouts/UserLayout';
import Home from './pages/user/home/Home';
import Categories from './pages/user/category/Categories';
import Products from './pages/user/products/Products';
import CategoryProducts from './pages/user/products/CategoryProducts';
import ProductDetails from './pages/user/products/ProductDetails';
import Cart from './pages/user/cart/Cart';
import ProtectedRoute from './components/user/ProtectedRoute';
import CartContextProvider from './components/user/context/CartContext';
import Profile from './pages/user/profile/Profile';
import Info from './pages/user/profile/Info';
import Orders from './pages/user/profile/Orders';
import UserContextProvider from './components/user/context/UserContext';
import Image from './pages/user/profile/Image';
import AuthProtectedRoute from './components/user/AuthProtectedRoute';
import ForgotPassword from './pages/user/login/ForgotPassword';
import ResetPassword from './pages/user/login/ResetPassword';
import CreateOrder from './pages/user/cart/CreateOrder';


export default function App() {

  const router = createBrowserRouter([

    {

      path: "/auth",
      element: 
      <AuthProtectedRoute>
        <CartContextProvider>
      <UserContextProvider>
      <AuthLayout />
      </UserContextProvider>
      </CartContextProvider>
      </AuthProtectedRoute>,
      
      children: [
        {
          path: "register",
          element: <Register />,
        },

        {
          path: "login",
          element: 
          <Login />,
          
        },

        {
          path: "forgot-password",
          element: 
          <ForgotPassword />,
          
        },

        {
          path: "reset-password",
          element: 
          <ResetPassword />,
          
        },
      
      ],
    },

    {
      path: '/',
      element: 
      <UserContextProvider>
    <CartContextProvider>
      <ProtectedRoute>
      <UserLayout />
      </ProtectedRoute>,
      </CartContextProvider>
      </UserContextProvider>,

      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "categories",
          element: <Categories /> 
        },
        {
          path: 'categories/:categoryId',
          element: <CategoryProducts />
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: 'product/:productId',
          element: <ProductDetails />
        },

        {
          path:'cart',
          element:<Cart />
        },

        {
          path: "create-order",
          element: <CreateOrder />
        },
        {
           path:'profile',
          element: <Profile />,
          children:[
            {
              path:'info',
              element:<Info />
            },
            {
              path:'orders',
              element:<Orders />
            },
            {
              path:'image',
              element:<Image />
            }
          ]

        },
      ]

    },
    
    {
      path: "/dashboard",
      element: <DashboardLayout />,
    },

  ]);


  return (
    <>
   
      <ToastContainer />
      <RouterProvider router={router} />
     

    </>
  );
}
