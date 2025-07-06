import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Home from './assets/components/homw/Home.jsx'
import Layout from './Layout.jsx'
import Product from './pages/Product.jsx'
import About from './assets/components/About/About.jsx'
import Contact from './assets/components/contact/Contact.jsx'
import SearchResults from './assets/components/header/Search.jsx'
import AuthPage from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
// import CartPage from "../pages/CartPage"; // adjust the path as needed
import CartPage from "./pages/CartPage";

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CartProvider } from "./Feature/CartContext.jsx";

import PaymentPage from './pages/PaymentPage';
import ProductView from './pages/ProductView.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'product', element: <Product /> },
      { path: 'contact', element: <Contact /> },
      { path: 'search', element: <SearchResults /> },
      { path: 'login', element: <AuthPage /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'pay', element: <PaymentPage /> },
      { path: 'product/:id', element: <ProductView /> }, 
     
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
<CartProvider>
  <RouterProvider router={router} />
</CartProvider>

  </StrictMode>
)
