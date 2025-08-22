import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, Button } from 'react-bootstrap';
import { useState } from "react";

export const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6)); // July 2025
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };
  
  const days = getDaysInMonth(currentDate);
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  
  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Header className="bg-white border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0 d-flex align-items-center">
            <ChevronLeft size={16} className="me-2 text-muted" />
            {currentMonth} {currentYear}
          </h6>
          <Button variant="link" className="text-primary p-0 text-decoration-none small">
            View
          </Button>
        </div>
      </Card.Header>
      <Card.Body className="p-3">
        <div className="row g-1 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="col text-center">
              <small className="text-muted fw-medium">{day}</small>
            </div>
          ))}
        </div>
        <div className="row g-1">
          {days.map((day, index) => (
            <div key={index} className="col p-1">
              {day && (
                <button
                  className={`btn btn-sm w-100 p-1 ${
                    day === 16 ? "btn-primary" : "btn-light"
                  }`}
                  style={{fontSize: '12px', minHeight: '28px'}}
                >
                  {day}
                </button>
              )}
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};