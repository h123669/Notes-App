import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout/Layout'
import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import { RecoilRoot } from 'recoil'
import Logout from './components/Logout/Logout'
import Home from './components/Home/Home'
import ProductedRoute from './components/ProtectRoute/ProductedRoute'


function App() {
  let router =createBrowserRouter([
    {path:"/",element:<Layout/>,children:[
      { index: true, element:<ProductedRoute><Home /></ProductedRoute>  },
      {path:"SignUp",element:<SignUp/>},
      {path:"SignIn",element: <SignIn/>},
      {path:"Logout",element:<Logout/>}
    ]}
  ])

  return (
    <>
<RecoilRoot>
      <RouterProvider router={router}></RouterProvider>
</RecoilRoot>
    </>
  )
}

export default App
