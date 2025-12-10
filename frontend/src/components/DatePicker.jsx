import React, { useEffect, useState } from "react";
import { useDiaryStore } from "../store/useDiaryStore";
import { useNavigate } from "react-router-dom";

const DatePicker = () => {
  const { diaries, showEntries } = useDiaryStore();

  useEffect(() => {
    showEntries();
  }, [showEntries]);

  const navigate = useNavigate();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Build set of entry dates → fast lookup
  const entryDates = new Set(
    diaries.map(d =>
      new Date(d.savedDate).toISOString().split("T")[0]
    )
  );

  // First day handling (Mon-start)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const adjustedFirstDay = (firstDayOfMonth + 6) % 7;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays = [];

  // Prev month filler
  for (let i = adjustedFirstDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      current: false,
      isToday: false,
      isFuture: true
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      i === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

    const isFuture =
      new Date(currentYear, currentMonth, i) >
      new Date(today.getFullYear(), today.getMonth(), today.getDate());

    calendarDays.push({
      day: i,
      current: true,
      isToday,
      isFuture
    });
  }

  // Next month filler
  while (calendarDays.length < 42) {
    calendarDays.push({
      day: calendarDays.length - (adjustedFirstDay + daysInMonth) + 1,
      current: false,
      isToday: false,
      isFuture: true
    });
  }

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="w-full max-w-[330px] px-6 py-7 border border-white/15 rounded-2xl bg-[#0d0d0d]">

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-white/10 transition text-white"
        >
          ‹
        </button>

        <span className="text-white font-medium text-lg">
          {monthNames[currentMonth]} {currentYear}
        </span>

        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-white/10 transition text-white"
        >
          ›
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 mb-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <div key={d} className="text-center text-white text-sm font-medium py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-y-1">
        {calendarDays.map((d, idx) => {
          const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
          const hasEntry = d.current && !d.isFuture && entryDates.has(dateString);

          return (
            <div key={idx} className="flex flex-col items-center justify-center">

              {/* Day Number */}
              <div
                onClick={() => {
                  if (hasEntry) {
                    navigate(`/entries?date=${dateString}`);
                  }
                }}
                className={`
    flex flex-col items-center justify-center w-10 h-10 rounded-full text-sm
    transition select-none
    ${d.isToday ? "bg-white text-black font-semibold" : d.current ? "text-white" : "text-white/40"}
    ${d.isFuture ? "opacity-30 pointer-events-none" : "hover:bg-white/10 cursor-pointer"}
  `}
              >
                {d.day}
                {hasEntry && (
                  <div className="w-1.5 h-1.5 bg-blue-800 rounded-full ml-0.5" />
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DatePicker;
