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

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:4000/calendar/get_schedule/${farmId}`);
      const data = await response.json();
      console.log(data);
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
      const response = await fetch(`http://127.0.0.1:4000/calendar/generate_schedule/${farmId}`);
      const data = await response.json();
      if (data.length > 0) {
        await saveScheduleToDB(data);  
        setCropSchedule(data);
        console.log("crop schedules:",cropSchedule)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const saveScheduleToDB = async (tasks) => {
    try {
      const phone=user.phone_number
      const response = await fetch(`http://127.0.0.1:4000/calendar/save_schedule/${farmId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tasks,phonenum:phone }),
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

  useEffect(() => {
    console.log("Crop Schedule:", cropSchedule);
    console.log(user.phone_number);
  }, [cropSchedule]);


  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDay };
  };

  const getEventColor = (title) => {
    const colors = {
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
      className: colors[title] || "bg-gray-200 text-gray-800",
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
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="p-2 hover:bg-gray-100 rounded-full text-emerald-600"
          >
            ←
          </button>
          <span className="text-2xl font-semibold text-emerald-800">
            <TranslatedText text={monthYear} />
          </span>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="p-2 hover:bg-gray-100 rounded-full text-emerald-600"
          >
            →
          </button>
        </div>
        <button
          onClick={() => setCurrentDate(new Date())}
          className="px-4 py-2 bg-blue-50 text-emerald-600 border rounded-md"
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
        <div key={day} className="p-3 text-center text-yellow-800 font-medium bg-yellow-50">
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
        <div key={day} className={`p-3 border min-h-32 ${isToday ? "bg-blue-50" : "bg-white"}`}>
          <span className={`w-8 h-8 inline-flex items-center justify-center rounded-full ${isToday ? "bg-yellow-200 text-emerald-600" : "text-gray-700"}`}>
            <TranslatedText text={day.toString()} />
          </span>
          <div className="mt-2 space-y-1">
            {dayEvents.map((event, index) => {
              const { className, emoji } = getEventColor(event.title);
              return (
                <div
                  key={index}
                  className={`p-2 text-sm rounded-md ${className}`}
                  onClick={() => {
                    setCurrentTask(event);
                    setModalShow(true);
                  }}
                >
                  <span>{emoji}</span> <TranslatedText text={event.title} />
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return <div className="grid grid-cols-7">{days}</div>;
  };

  return (
    <div className="max-w-6xl mx-auto  bg-emerald-50 rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl text-yellow-900 font-bold mb-8">
        <TranslatedText text="Crop Growing Calendar" />
      </h2>
      {renderCalendarHeader()}
      {loading ? (
        <p>
          <TranslatedText text="Loading..." />
        </p>
      ) : (
        renderCalendarBody()
      )}
      {modalShow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-yellow-50 rounded-lg max-w-lg w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-amber-900">
                <TranslatedText text={currentTask?.title} />
              </h3>
              <button
                onClick={() => setModalShow(false)}
                className="text-amber-500 hover:text-amber-700 text-2xl font-light"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-amber-800">
                  <TranslatedText text="Description" />
                </h4>
                <p className="text-amber-700 mt-1">
                  <TranslatedText text={currentTask?.description} />
                </p>
              </div>
              <div>
                <h4 className="font-medium text-amber-800">
                  <TranslatedText text="Task Details" />
                </h4>
                <p className="text-amber-700 mt-1">
                  <TranslatedText text={currentTask?.task_description} />
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-amber-800">
                    <TranslatedText text="Start Date" />
                  </h4>
                  <p className="text-amber-700 mt-1">
                    {currentTask?.start_date &&
                      <TranslatedText text={new Date(currentTask.start_date).toLocaleDateString()} />}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-amber-800">
                    <TranslatedText text="End Date" />
                  </h4>
                  <p className="text-amber-700 mt-1">
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
