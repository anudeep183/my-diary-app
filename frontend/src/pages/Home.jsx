import React from "react";
import DatePicker from "../components/DatePicker";
import DiaryEntry from "./DiaryEntry";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="flex flex-col max-md:gap-20 md:flex-row  items-center justify-between mt-24 px-4 md:px-16 lg:px-24 xl:px-32">

        <div className="flex flex-col items-center md:items-start">

          <h1 className="text-center md:text-left text-5xl md:text-6xl font-medium 
               max-w-2xl text-slate-50 leading-tight">
            Your story, organized effortlessly.
          </h1>
          <br />
          <p className="text-center md:text-left text-sm text-slate-200 max-w-lg mt-2">
            Digital diary designed to help you reflect, track your life, and stay emotionally balanced.. one entry at a time.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-8 text-sm">
            <Link to='/entry' className="flex items-center bg-white hover:bg-slate-200 text-black active:scale-95 rounded-md px-7 h-11">
              Start Writing...
            </Link>

            
          </div>
        </div>

        <DatePicker />

        
      </section>


    </div>
  );
};

export default Home
