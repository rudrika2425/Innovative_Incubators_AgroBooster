import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CropCalendar = () => {
  const [cropSchedule, setCropSchedule] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { farmId } = useParams();

  useEffect(() => {
    if (farmId) {
      fetchSchedule();
    }
  }, [farmId]);

  const fetchSchedule = async () => {
    setLoading(true);
    setError(null);

    try {
      const storedData = JSON.parse(localStorage.getItem(`cropSchedule_${farmId}`)) || [];

      if (storedData.length > 0) {
        setCropSchedule(storedData);
        fetchAndCacheData(); // Fetch fresh data in the background
      } else {
        const success = await fetchAndCacheData();
        if (!success) throw new Error("No crop data available");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAndCacheData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/calendar/generate_schedule/${farmId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      if (data.length > 0) {
        setCropSchedule(data);
        localStorage.setItem(`cropSchedule_${farmId}`, JSON.stringify(data));
        return true;
      }
      return false;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return {
      daysInMonth: new Date(year, month + 1, 0).getDate(),
      firstDay: new Date(year, month, 1).getDay(),
    };
  };

  const getEventColor = (title) => {
    const colors = {
      "Land Preparation": "bg-yellow-300 text-yellow-900",
      "Seedbed Preparation": "bg-lime-300 text-lime-900",
      "Sowing": "bg-amber-400 text-amber-900",
      "Irrigation": "bg-teal-300 text-teal-900",
      "Weed Management": "bg-green-400 text-green-900",
      "Pest and Disease Management": "bg-amber-600 text-amber-900",
      "Nutrient Management": "bg-emerald-500 text-emerald-900",
    };
    return colors[Object.keys(colors).find((key) => title.includes(key))] || "bg-gray-200 text-gray-800";
  };

  const isDateInRange = (date, start, end) => {
    const checkDate = new Date(date).setHours(0, 0, 0, 0);
    return checkDate >= new Date(start).setHours(0, 0, 0, 0) && checkDate <= new Date(end).setHours(0, 0, 0, 0);
  };

  const renderCalendarHeader = () => (
    <div className="flex items-center justify-between mb-6 px-4">
      <div className="flex items-center gap-6">
        <button
          onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-gray-800"
        >
          ←
        </button>
        <span className="text-2xl font-semibold text-gray-800">
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button
          onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-gray-800"
        >
          →
        </button>
      </div>
      <button
        onClick={() => setCurrentDate(new Date())}
        className="px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
      >
        Today
      </button>
    </div>
  );

  const renderCalendarBody = () => {
    const { daysInMonth, firstDay } = getDaysInMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 bg-gray-50 border" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === new Date().toDateString();
      const dayEvents = cropSchedule.filter((event) => isDateInRange(date, event.start_date, event.end_date));

      days.push(
        <div
          key={day}
          className={`p-3 border min-h-32 relative transition-colors rounded-lg ${
            isToday ? "bg-blue-50" : dayEvents.length > 0 ? "bg-gray-50" : "bg-white"
          }`}
        >
          <span
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              isToday ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {day}
          </span>
          <div className="space-y-1.5 mt-2">
            {dayEvents.map((event, index) => (
              <div
                key={`${day}-${index}`}
                className={`${getEventColor(event.title)} text-sm p-1.5 rounded-md cursor-pointer truncate shadow-sm`}
                onClick={() => {
                  setCurrentTask(event);
                  setModalShow(true);
                }}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-0">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-3 text-center font-medium text-gray-600 bg-gray-50 border">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto my-12 bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-amber-900 mb-6">Crop Growing Calendar</h2>
      {loading ? <p className="text-center text-amber-700">Loading schedule...</p> : renderCalendarHeader()}
      {error ? <p className="text-center text-red-600">{error}</p> : renderCalendarBody()}
    </div>
  );
};

export default CropCalendar;
