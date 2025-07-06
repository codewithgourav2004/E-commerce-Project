import { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { FaCartShopping } from "react-icons/fa6";
import { CartContext } from '../../../Feature/CartContext'; // Adjust path if needed

export default function Header() {
  const [query, setQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { cart } = useContext(CartContext); // ✅ Using global cart context
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // ✅ Total quantity

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="shadow sticky z-50 top-0 bg-white">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h3 className="text-xl font-bold text-gray-800">
              All IN <span className="text-blue-500">ONE</span> STORE
            </h3>
          </Link>

          {/* Hamburger Toggle */}
          <button
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex items-center w-full max-w-sm mx-4 lg:order-1"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-orange-600 text-white rounded-r-md hover:bg-orange-700"
            >
              Search
            </button>
          </form>

          {/* Right-side buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 lg:order-2">
            <Link
              to="/login"
              className="inline-block px-5 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-700 rounded-full hover:bg-blue-700 hover:text-white transition"
            >
              Log in
            </Link>

            {/* Cart Button with Badge */}
           <Link
  to="/cart"
  className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-red-400 shadow-md hover:from-red-500 hover:to-pink-500 transition-transform transform hover:scale-105"
  aria-label="Go to cart"
>
  <FaCartShopping className="text-white text-xl" />

  {totalItems > 0 && (
    <span
      className="absolute -top-1.5 -right-1.5 bg-white text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm min-w-[18px] text-center"
    >
      {totalItems > 99 ? '99+' : totalItems}
    </span>
  )}
</Link>


            <Link to="/dashboard">
              <FaUserCircle className="w-8 h-8" />
            </Link>
          </div>

          {/* Navigation Links + Mobile Menu */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:flex lg:w-auto lg:order-1`}>
            <ul className="flex flex-col lg:flex-row font-medium mt-4 lg:mt-0 lg:space-x-8">
              {['Home', 'About', 'Product', 'Contact'].map((page) => (
                <li key={page}>
                  <NavLink
                    to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                    className={({ isActive }) =>
                      `block py-2 pl-3 pr-4 duration-200 ${
                        isActive ? 'text-orange-700' : 'text-gray-700'
                      } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {page}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Mobile Search Bar */}
            <form
              onSubmit={handleSearch}
              className="sm:hidden flex mt-4 px-4 w-full"
            >
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded-r-md hover:bg-orange-700"
              >
                Go
              </button>
            </form>

            {/* Mobile Buttons */}
            <div className="flex flex-col gap-2 items-start p-4 lg:hidden">
              <Link
                to="/login"
                className="block w-full text-center px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-700 rounded-full hover:bg-blue-700 hover:text-white transition"
              >
                Log in
              </Link>
              <Link to="/cart">
                <FaCartShopping className="w-6 h-6" />
              </Link>
              <Link to="/dashboard" className="text-gray-700 flex items-center gap-2">
                <FaUserCircle className="w-6 h-6" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
