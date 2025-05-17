import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import style from './sidebar.module.css'
import { FaExpandAlt } from "react-icons/fa";
import { FaCompressAlt } from "react-icons/fa";

export default function CustomSidebar() {

  const [isCollapsed,setIsCollapsed] = useState(false);

  const toggleCollapse = ()=>{
    setIsCollapsed(!isCollapsed);
  }

  return (
<Sidebar collapsed={isCollapsed} className={style.sidebar}>

{isCollapsed ? <FaExpandAlt onClick={toggleCollapse}/> : <FaCompressAlt onClick={toggleCollapse} /> } 
  <Menu
    menuItemStyles={{
      button: {
        // the active class will be added automatically by react router
        // so we can use it to style the active menu item
        [`&.active`]: {
          backgroundColor: '#13395e',
          color: '#b6c8d9',
        },
      },
    }}
  >
    <MenuItem component={<Link to="/profile/info" />}> Info </MenuItem>
    <MenuItem component={<Link to="/profile/orders" />}> Orders </MenuItem>
    <MenuItem component={<Link to="/profile/image" />}> Image </MenuItem>
    
  </Menu>
</Sidebar>
  )
}
