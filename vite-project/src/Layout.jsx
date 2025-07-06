import React from 'react'
import Header from './assets/components/header/Header'
import Footer from './assets/components/footer/Footer'
import {Outlet} from 'react-router-dom'
const Layout = () => {
  return (
       <>
       {/* <Header/> */}
       <Outlet/>
       {/* <Footer/> */}
    </>
  )
}

export default Layout