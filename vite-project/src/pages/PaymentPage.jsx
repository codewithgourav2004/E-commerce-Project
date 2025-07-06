// src/pages/PaymentPage.jsx
import React from "react";

export default function PaymentPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Scan & Pay</h1>

      {/* UPI QR Code */}
      <img
        src="/upi-qr.jpg" // Make sure to place your QR image in the public folder as 'upi-qr.jpg'
        alt="UPI QR"
        className="w-64 h-64 object-contain mb-6 border rounded-md shadow"
      />

      {/* Pay Now Button */}
      <a
        href="upi://pay?pa=7042289480@yapl&pn=GOURAV%20KUMAR&cu=INR"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md transition"
      >
        Pay Now
      </a>

      <p className="mt-4 text-gray-500 text-sm">
        UPI ID: <strong>7042289480@yapl</strong>
      </p>
    </div>
  );
}
