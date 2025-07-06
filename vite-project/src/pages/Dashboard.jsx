import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    setUsername(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    alert("You are now logged out");
    // Optionally navigate to login
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        {username ? (
          <>
            <h1 className="text-2xl font-bold mb-2">Welcome, {username}!</h1>
            <p className="text-gray-600 mb-4">You're now logged in 🎉</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
             <button
                onClick={() => navigate("/")}
                className="bg-green-500 text-white px-6 py-2 ml-2.5 rounded hover:bg-green-600"
              >
                Go to Home
              </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              You are not logged in!
            </h1>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
