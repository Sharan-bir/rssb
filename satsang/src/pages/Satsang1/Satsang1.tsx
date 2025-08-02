import React from 'react';
import SatsangCell from '../../components/SatsangCell/SatsangCell';
import './Satsang1.css';

const Satsang1: React.FC = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeks = [1, 2, 3, 4, 5];

  return (
    <div className="satsang-container">
      
      {/* Days header row */}
      <div className="days-header">
        <div className="empty-corner"></div>
        {days.map((day) => (
          <div key={day} className="day-header">
            {day}
          </div>
        ))}
      </div>

      {/* Weeks and cells */}
      {weeks.map((week) => (
        <div key={week} className="week-row">
          <div className="week-label">Week {week}</div>
          {days.map((day) => (
            <SatsangCell key={`${day}-${week}`} day={day} weekNumber={week} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Satsang1;