import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate(); // ✅ Move inside component
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);

    const totalPrice = items.reduce((acc, item) => acc + (item.price || 0), 0);
    setTotal(totalPrice);
  }, []);

  const removeFromCart = (id) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));

    const newTotal = newCart.reduce((acc, item) => acc + (item.price || 0), 0);
    setTotal(newTotal);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        🛒 Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`} // ✅ Ensures uniqueness
              className="flex items-center justify-between border p-4 rounded-lg mb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.images?.[0] || item.image || "/placeholder.jpg"}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                  onError={(e) => (e.target.src = '/placeholder.jpg')}
                />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-600">
                    ${item.price?.toFixed(2)} × 1
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold text-green-600">
                  ${item.price?.toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <hr className="my-4" />
          <div className="text-right text-xl font-bold mb-4">
            Total: ${total.toFixed(2)}
          </div>

          <div className="text-right">
            <button
              onClick={() => {
                localStorage.setItem("orderTotal", total);
                navigate("/pay");
              }}
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
}
