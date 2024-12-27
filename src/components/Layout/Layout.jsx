import React from 'react'
import "./Layout.module.css"
import { Outlet } from 'react-router'
import BasicExample from '../Navbar/Navbar';

export default function Layout() {
  return <>
  <BasicExample/>
  <Outlet/>
  </>
}
