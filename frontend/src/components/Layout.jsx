import React from 'react'
import Navbar from './Navbar'
import { Link, Outlet, useLocation } from "react-router-dom"
import { Plus } from 'lucide-react';

const Layout = () => {

  const location = useLocation();

  const hideButton = location.pathname.startsWith('/entry');


  return (
    <div>
      <Navbar />

      {!hideButton && (
        <div className="fixed bottom-6 right-6 z-50 ">
          <Link
            to="/entry" className="animate-glow-updown flex items-center gap-2 px-6 h-12 border border-slate-600 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white/10 active:scale-95 transition"
          >
            <Plus size={20} />
            <span>Add Entry</span>
          </Link>
        </div>
      )}

      <Outlet />

    </div>
  )
}

export default Layout