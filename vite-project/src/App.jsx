import { useState } from "react"; // ✅ you missed importing useState
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./assets/components/footer/Footer";
import Header from "./assets/components/header/Header";
import Home from "./assets/components/homw/Home"; // 🛑 likely typo: `homw` → `home`
import Product from "./pages/Product";
import SearchResults from "./components/SearchResults";
import AuthPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About"; // ✅ you used <About />, but didn't import it
import PaymentPage from "./pages/PaymentPage"; // ✅ add this for /pay route
import CartPage from "./pages/CartPage";
import ProductView from "./pages/ProductView";
function App() {
  const [count, setCount] = useState(0); // ✅ correct spelling: setCount (not SetCount)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/pay" element={<PaymentPage />} />
         <Route path="/product/:id" element={<ProductView />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
