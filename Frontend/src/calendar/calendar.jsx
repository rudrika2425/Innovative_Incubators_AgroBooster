import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import "./fullcalendar.css"; // Create a custom CSS file for additional styling

const CropCalendar = () => {
  const [cropSchedule, setCropSchedule] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Fetch crop schedule data from the Flask backend
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("http://localhost:5000/generate_schedule"); // Flask API URL
        const data = await response.json();
        console.log(data);
        setCropSchedule(data);
      } catch (error) {
        console.error("Error fetching crop schedule:", error);
      }
    };

    fetchSchedule();
  }, []);

  // Map the crop schedule to FullCalendar events
  const events = cropSchedule.map((task) => ({
    title: `${task.title}`,
    start: new Date(task.start_date).toISOString(),
    end: new Date(task.end_date).toISOString(),
    description: task.description,
    taskDetails: task,
  }));

  // Handle event click to show modal with task details
  const handleEventClick = (info) => {
    setCurrentTask(info.event.extendedProps.taskDetails);
    setModalShow(true);
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Crop Growing Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventColor="#28a745" // Green color for events
        eventContent={(eventInfo) => {
          return (
            <div className="event-title">
              <strong>{eventInfo.event.title}</strong>
            </div>
          );
        }}
        eventClick={handleEventClick}
        eventRender={(info) => {
          // Add hover effects to event blocks
          const eventEl = info.el;
          eventEl.classList.add("hoverable-event");
        }}
      />

      {/* Modal to display task details */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentTask?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Description:</strong> {currentTask?.desc}</p>
          <p><strong>Start Date:</strong> {currentTask?.start_date}</p>
          <p><strong>End Date:</strong> {currentTask?.end_date}</p>
          <p><strong>Additional Info:</strong> {currentTask?.additional_info}</p>
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
