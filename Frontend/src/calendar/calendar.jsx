import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TranslatedText } from "../languageTranslation/TranslatedText";
import { useUser } from "../Context/UserContext";

const CropCalendar = () => {
  const [cropSchedule, setCropSchedule] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { farmId } = useParams();
  const { user } = useUser();

  // Your existing fetch functions remain the same
  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}calendar/get_schedule/${farmId}`);
      const data = await response.json();
      if (response.ok) {
        setCropSchedule(data.tasks);
      } else {
        console.warn("No schedule found, fetching new data...");
        await retryFetch();
      }
    } catch (error) {
      console.error("Error fetching crop schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  const retryFetch = async (retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        await fetchAndCacheData();
        return;
      } catch (error) {
        console.warn(`Retrying... (${i + 1})`);
        await new Promise((res) => setTimeout(res, delay));
      }
    }
    console.error("Failed after multiple retries.");
  };

  const fetchAndCacheData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}calendar/generate_schedule/${farmId}`);
      const data = await response.json();
      if (data.length > 0) {
        await saveScheduleToDB(data);
        setCropSchedule(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const saveScheduleToDB = async (tasks) => {
    try {
      const phone = user.phone_number;
      const response = await fetch(`${import.meta.env.VITE_API_URL}calendar/save_schedule/${farmId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tasks, phonenum: phone }),
      });
      const result = await response.json();
      console.log("Schedule saved:", result);
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDay };
  };

  const getEventColor = (title) => {
    const colorMap = {
      "Aqua Pump": "bg-blue-600 text-white",
      "Power Strength": "bg-green-600 text-white",
      "Pilates": "bg-orange-500 text-white",
      "Land Preparation": "bg-green-100 text-green-800",
      "Seedbed Preparation": "bg-lime-100 text-lime-800",
      "Sowing": "bg-yellow-100 text-yellow-800",
      "Irrigation": "bg-sky-100 text-sky-800",
      "Weed Management": "bg-teal-100 text-teal-800",
      "Pest and Disease Management": "bg-red-100 text-red-800",
      "Nutrient Management": "bg-purple-100 text-purple-800",
      "Harvesting": "bg-orange-100 text-orange-800",
    };

    const emojiMap = {
      "Land Preparation": "🌱",
      "Seedbed Preparation": "🌿",
      "Sowing": "🌾",
      "Irrigation": "💧",
      "Weed Management": "🌾",
      "Pest and Disease Management": "🐛",
      "Nutrient Management": "🥦",
      "Harvesting": "📅",
    };

    return {
      className: colorMap[title] || "bg-gray-600 text-white",
      emoji: emojiMap[title] || "📌",
    };
  };

  const isDateInRange = (date, start, end) => {
    const checkDate = new Date(date).setHours(0, 0, 0, 0);
    const startDate = new Date(start).setHours(0, 0, 0, 0);
    const endDate = new Date(end).setHours(0, 0, 0, 0);
    return checkDate >= startDate && checkDate <= endDate;
  };

  const renderCalendarHeader = () => {
    const monthYear = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 px-2 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-6 mb-4 sm:mb-0">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="p-2 hover:bg-gray-100 rounded-full text-emerald-600 transition-colors"
          >
            ←
          </button>
          <span className="text-xl sm:text-2xl font-semibold text-emerald-800 whitespace-nowrap">
            <TranslatedText text={monthYear} />
          </span>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="p-2 hover:bg-gray-100 rounded-full text-emerald-600 transition-colors"
          >
            →
          </button>
        </div>
        <button
          onClick={() => setCurrentDate(new Date())}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 text-emerald-600 border rounded-md hover:bg-blue-100 transition-colors"
        >
          <TranslatedText text="Today" />
        </button>
      </div>
    );
  };

  const renderCalendarBody = () => {
    const { daysInMonth, firstDay } = getDaysInMonth(currentDate);
    const days = [];
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    weekDays.forEach((day) => {
      days.push(
        <div key={day} className="p-1 sm:p-3 text-center text-yellow-800 font-medium bg-yellow-50 text-xs sm:text-sm">
          <TranslatedText text={day} />
        </div>
      );
    });

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 bg-yellow-50" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === new Date().toDateString();
      const dayEvents = cropSchedule.filter((event) => isDateInRange(date, event.start_date, event.end_date));

      days.push(
        <div key={day} className={`p-1 sm:p-3 border min-h-[80px] sm:min-h-[120px] lg:min-h-[140px] relative ${isToday ? "bg-blue-50" : "bg-white"}`}>
          <span className={`w-6 h-6 sm:w-8 sm:h-8 inline-flex items-center justify-center rounded-full text-xs sm:text-sm ${isToday ? "bg-yellow-200 text-emerald-600" : "text-gray-700"}`}>
            <TranslatedText text={day.toString()} />
          </span>
          <div className="mt-1 sm:mt-2 space-y-1 overflow-y-auto max-h-[60px] sm:max-h-[80px] lg:max-h-[100px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {dayEvents.map((event, index) => {
              const { className, emoji } = getEventColor(event.title);
              return (
                <div
                  key={index}
                  className={`p-1 sm:p-2 text-xs sm:text-sm rounded-md cursor-pointer hover:opacity-90 transition-opacity ${className}`}
                  onClick={() => {
                    setCurrentTask(event);
                    setModalShow(true);
                  }}
                >
                  <span className="mr-1">{emoji}</span>
                  <span className="truncate inline-block max-w-[calc(100%-20px)]">
                    <TranslatedText text={event.title} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return <div className="grid grid-cols-7 gap-px bg-gray-200">{days}</div>;
  };

  return (
    <div className="max-w-6xl mx-auto bg-emerald-50 rounded-2xl shadow-lg p-2 sm:p-4 lg:p-8">
      <h2 className="text-2xl sm:text-3xl text-yellow-900 font-bold mb-4 sm:mb-8 px-2">
        <TranslatedText text="Crop Growing Calendar" />
      </h2>
      {renderCalendarHeader()}
      <div className="rounded-lg overflow-hidden border border-gray-200">
        {loading ? (
          <div className="p-4 text-center">
            <TranslatedText text="Loading..." />
          </div>
        ) : (
          renderCalendarBody()
        )}
      </div>

      {/* Modal */}
      {modalShow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-yellow-50 rounded-lg w-full max-w-lg p-4 sm:p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-amber-900">
                <TranslatedText text={currentTask?.title} />
              </h3>
              <button
                onClick={() => setModalShow(false)}
                className="text-amber-500 hover:text-amber-700 text-2xl font-light transition-colors"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-amber-800">
                  <TranslatedText text="Description" />
                </h4>
                <p className="text-amber-700 mt-1 text-sm sm:text-base">
                  <TranslatedText text={currentTask?.description} />
                </p>
              </div>
              <div>
                <h4 className="font-medium text-amber-800">
                  <TranslatedText text="Task Details" />
                </h4>
                <p className="text-amber-700 mt-1 text-sm sm:text-base">
                  <TranslatedText text={currentTask?.task_description} />
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-amber-800">
                    <TranslatedText text="Start Date" />
                  </h4>
                  <p className="text-amber-700 mt-1 text-sm sm:text-base">
                    {currentTask?.start_date &&
                      <TranslatedText text={new Date(currentTask.start_date).toLocaleDateString()} />}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-amber-800">
                    <TranslatedText text="End Date" />
                  </h4>
                  <p className="text-amber-700 mt-1 text-sm sm:text-base">
                    {currentTask?.end_date &&
                      <TranslatedText text={new Date(currentTask.end_date).toLocaleDateString()} />}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropCalendar;