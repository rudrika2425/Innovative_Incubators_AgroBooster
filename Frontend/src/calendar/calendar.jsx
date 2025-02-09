import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Modal, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import "./calendar.css";

const CropCalendar = () => {
  const [cropSchedule, setCropSchedule] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const { farmId } = useParams();
  
  
  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const storedData = localStorage.getItem(`cropSchedule_${farmId}`);
        if (storedData) {
          console.log("Using cached data");
          setCropSchedule(JSON.parse(storedData));
          
          console.log(JSON.parse(storedData))
        } else {
          console.log("Fetching data from API");
          const response = await fetch(`http://127.0.0.1:4000/calendar/generate_schedule/${farmId}`);
          const data = await response.json();
          setCropSchedule(data);
          localStorage.setItem(`cropSchedule_${farmId}`, JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching crop schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [farmId]);

  const clearData = (farmId) => {
    localStorage.removeItem(`cropSchedule_${farmId}`);
    console.log(`Data for farmId: ${farmId} has been removed from local storage.`);
  };

  const getEventClassName = (title) => {
    if (title.includes("Aqua Pump")) return "event-aqua-pump";
    if (title.includes("Power Strength")) return "event-power-strength";
    if (title.includes("Pilates")) return "event-pilates";
    return "event-default";  // Default class for other events
  };


  // Map the crop schedule to FullCalendar events
  const events = cropSchedule.map((task) => ({
    title: task.title,
    start: task.start_date,
    end: task.end_date,
    description: task.description,
    taskDescription: task.task_description,
    sustainableResource: task.sustainable_resource,
    taskDetails: task,
    className: getEventClassName(task.title),  // Add a custom class based on the title or task type
  }));

 
  // Handle event click to show modal
  const handleEventClick = (info) => {
    setCurrentTask(info.event.extendedProps.taskDetails);
    setModalShow(true);
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Crop Growing Calendar</h2>
     
      {loading ? (
        <div className="loading-container">
          <Spinner animation="border" variant="success" />
          <p>Loading schedule...</p>
        </div>
      ) : cropSchedule.length === 0 ? (
        <p>No tasks available for this farm.</p>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventColor="#28a745"
          eventClick={handleEventClick}
        />
      )}

      {/* Modal for Task Details */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentTask?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Description:</strong> {currentTask?.description}</p>
          <p><strong>Task Description:</strong> {currentTask?.task_description}</p>
          <p><strong>Start Date:</strong> {new Date(currentTask?.start_date).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(currentTask?.end_date).toLocaleDateString()}</p>
          <p><strong>Sustainable Resources:</strong> {currentTask?.sustainable_resource}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CropCalendar;
