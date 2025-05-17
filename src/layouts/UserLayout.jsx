import React from 'react'
import CustomNavbar from '../components/user/navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
  return (
    <>
    <CustomNavbar />
    <Outlet />
    </>
  )
}
