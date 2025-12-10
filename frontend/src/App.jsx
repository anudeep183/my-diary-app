import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import "./App.css";
import DiaryEntry from "./pages/DiaryEntry";
import DiaryEntries from "./pages/DiaryEntries";

const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0D0D0D]">
        <Loader className="w-10 h-10 text-white animate-spin" />
      </div>
    );
  }

  return (

    <div className="bg-[#0D0D0D] min-h-screen">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/entry" element={authUser ? <DiaryEntry /> : <Navigate to="/login" />} />
          <Route path="/entry/:id" element={authUser ? <DiaryEntry /> : <Navigate to="/login" />} />
          <Route path="/entries" element={authUser ? <DiaryEntries /> : <Navigate to="/login" />} />
        </Route>

        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#0D0D0D",
            color: "#fff",
            borderRadius: "10px",
            fontSize: "14px",
            padding: "12px 18px",
          },
        }}
      />
    </div>
  );
};

export default App;
