"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [note, setNote] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Load note
  useEffect(() => {
    const saved = localStorage.getItem("note");
    if (saved) setNote(saved);
  }, []);

  // Save note
  useEffect(() => {
    localStorage.setItem("note", note);
  }, [note]);

  const today = new Date();

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 to-black grid md:grid-cols-2 gap-6">

      {/* Image Section */}
      <div className="relative h-64 md:h-full">
        <img
          src="/cat.jpeg"
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute bottom-4 left-4 text-white text-2xl font-bold">
          Coding Days 🐱💻
        </div>
      </div>

      {/* Calendar + Notes */}
      <div className="flex flex-col gap-6">

        {/* Calendar */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">

          {/* Month Switcher */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1
                  )
                )
              }
              className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 hover:scale-105 transition"
            >
              ←
            </button>

            <h2 className="text-xl font-bold text-white">
              {currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1
                  )
                )
              }
              className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 hover:scale-105 transition"
            >
              →
            </button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-300 mb-2">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDay + daysInMonth }, (_, i) => {
              if (i < firstDay) {
                return <div key={i}></div>;
              }

              const day = i - firstDay + 1;

              const isStart = day === startDate;
              const isEnd = day === endDate;
              const isBetween =
                startDate && endDate && day > startDate && day < endDate;

              const isToday =
                day === today.getDate() &&
                currentMonth.getMonth() === today.getMonth() &&
                currentMonth.getFullYear() === today.getFullYear();

              return (
                <div
                  key={i}
                  onClick={() => {
                    if (!startDate || (startDate && endDate)) {
                      setStartDate(day);
                      setEndDate(null);
                    } else {
                      if (day < startDate) {
                        setEndDate(startDate);
                        setStartDate(day);
                      } else {
                        setEndDate(day);
                      }
                    }
                  }}
                  className={`p-2 border border-gray-600 rounded-lg cursor-pointer text-center font-medium text-white
                    ${isStart || isEnd ? "bg-blue-600 text-white" : ""}
                    ${isBetween ? "bg-blue-900" : ""}
                    ${isToday ? "border-2 border-white" : ""}
                    hover:scale-105 hover:bg-gray-700 transition duration-200
                  `}
                >
                  {day}
                </div>
              );
            })}
          </div>

        </div>

        {/* Notes */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-bold text-white mb-2">Notes</h2>

          <textarea
            className="w-full border border-gray-600 bg-gray-900 text-white p-2 rounded"
            rows={4}
            placeholder="Write notes..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

      </div>

    </div>
  );
}