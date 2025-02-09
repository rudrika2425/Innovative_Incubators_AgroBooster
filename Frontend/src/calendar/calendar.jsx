import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CropCalendar = () => {
  const [cropSchedule, setCropSchedule] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const {farmId} = useParams();

  // ... keeping the same fetch functions and useEffect ...
  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const storedData = localStorage.getItem(`cropSchedule_${farmId}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.length > 0) {
          setCropSchedule(parsedData);
        } else {
          await fetchAndCacheData();
        }
      } else {
        await fetchAndCacheData();
      }
    } catch (error) {
      console.error("Error fetching crop schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAndCacheData = async () => {
    const response = await fetch(`http://127.0.0.1:4000/calendar/generate_schedule/${farmId}`);
    const data = await response.json();
    if (data.length > 0) {
      setCropSchedule(data);
      localStorage.setItem(`cropSchedule_${farmId}`, JSON.stringify(data));
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [farmId]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDay };
  };

  const getEventColor = (title) => {
    const colors = {
      "Land Preparation": "bg-blue-200 hover:bg-blue-300 text-blue-800",
      "Seedbed Preparation": "bg-emerald-200 hover:bg-emerald-300 text-emerald-800",
      "Sowing": "bg-amber-200 hover:bg-amber-300 text-amber-800",
      "Irrigation": "bg-cyan-200 hover:bg-cyan-300 text-cyan-800",
      "Weed Management": "bg-emerald-200 hover:bg-emerald-300 text-emerald-800",
      "Pest and Disease Management": "bg-rose-200 hover:bg-rose-300 text-rose-800",
      "Nutrient Management": "bg-violet-200 hover:bg-violet-300 text-violet-800"
    };

    for (const [key, value] of Object.entries(colors)) {
      if (title.includes(key)) return value;
    }
    return "bg-gray-200 hover:bg-gray-300 text-gray-800";
  };

  const isDateInRange = (date, start, end) => {
    const checkDate = new Date(date).setHours(0, 0, 0, 0);
    const startDate = new Date(start).setHours(0, 0, 0, 0);
    const endDate = new Date(end).setHours(0, 0, 0, 0);
    return checkDate >= startDate && checkDate <= endDate;
  };

  const renderCalendarHeader = () => {
    const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    return (
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-gray-800"
          >
            <span className="text-xl">←</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-800">{monthYear}</span>
          </div>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-gray-800"
          >
            <span className="text-xl">→</span>
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
  };

  const renderCalendarBody = () => {
    const { daysInMonth, firstDay } = getDaysInMonth(currentDate);
    const days = [];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const weekDayHeaders = weekDays.map(day => (
      <div key={day} className="p-3 text-center font-medium text-sm text-gray-600 bg-gray-50 border-b border-gray-200">
        {day}
      </div>
    ));

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 bg-gray-50/50 border border-gray-100" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === new Date().toDateString();
      const dayEvents = cropSchedule.filter(event => 
        isDateInRange(date, event.start_date, event.end_date)
      );

      days.push(
        <div 
          key={day}
          className={`p-3 border border-gray-100 min-h-32 relative transition-colors
            ${isToday ? 'bg-blue-50/70' : dayEvents.length > 0 ? 'bg-gray-50/30' : 'bg-white'}`}
        >
          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm
            ${isToday ? 'bg-blue-500 text-white font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
            {day}
          </span>
          <div className="space-y-1.5 mt-2">
            {dayEvents.map((event, index) => (
              <div
                key={`${day}-${index}`}
                className={`${getEventColor(event.title)} text-sm p-1.5 rounded-md 
                  cursor-pointer truncate shadow-sm transition-colors`}
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
      <div className="grid grid-cols-7 gap-0 bg-white rounded-lg overflow-hidden shadow-md">
        {weekDayHeaders}
        {days}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto my-12 bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Crop Growing Calendar</h2>
        <div className="flex gap-3">
          {['Land Preparation', 'Seedbed Preparation', 'Sowing', 'Irrigation', 'Weed Control', 'Nutrient Management'].map((type) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getEventColor(type).split(' ')[0]}`} />
              <span className="text-xs text-gray-600">{type}</span>
            </div>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 space-y-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Loading schedule...</p>
        </div>
      ) : cropSchedule.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="mt-4 text-gray-600">No tasks available for this farm.</p>
        </div>
      ) : (
        <div className="calendar-wrapper">
          {renderCalendarHeader()}
          {renderCalendarBody()}
        </div>
      )}

      {modalShow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{currentTask?.title}</h3>
              <button 
                onClick={() => setModalShow(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-light"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700">Description</h4>
                <p className="text-gray-600 mt-1">{currentTask?.description}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Task Details</h4>
                <p className="text-gray-600 mt-1">{currentTask?.task_description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700">Start Date</h4>
                  <p className="text-gray-600 mt-1">
                    {currentTask?.start_date && new Date(currentTask.start_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">End Date</h4>
                  <p className="text-gray-600 mt-1">
                    {currentTask?.end_date && new Date(currentTask.end_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Sustainable Resources</h4>
                <p className="text-gray-600 mt-1">{currentTask?.sustainable_resource}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalShow(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropCalendar;