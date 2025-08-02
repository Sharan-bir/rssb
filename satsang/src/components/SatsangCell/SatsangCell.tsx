import React, { useState, useRef, useEffect } from 'react';
import './SatsangCell.css';

interface SatsangCellProps {
  day: string;
  weekNumber: number;
}

const SatsangCell: React.FC<SatsangCellProps> = ({ day, weekNumber }) => {
  const [isActive, setIsActive] = useState(false);
  const [language, setLanguage] = useState('');
  const [timing, setTiming] = useState('');
  const cellRef = useRef<HTMLDivElement>(null);
  const languages = ['Select Language', 'Hindi', 'English', 'Gujarati', 'Sanskrit'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cellRef.current && !cellRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCellClick = () => {
    setIsActive(true);
  };

  const handleInputFocus = (e: React.FocusEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      ref={cellRef}
      className={`satsang-cell ${isActive ? 'active' : ''}`}
      onClick={handleCellClick}
    >
      <div className="cell-header">
        <span className="day">{day}</span>
        <span className="week">Week {weekNumber}</span>
      </div>
      
      {isActive ? (
        <div className="inputs-container" onClick={(e) => e.stopPropagation()}>
          <select
            className="language-dropdown"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            onFocus={handleInputFocus}
            autoFocus
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <input
            type="text"
            className="timing-input"
            value={timing}
            onChange={(e) => setTiming(e.target.value)}
            onFocus={handleInputFocus}
            placeholder="HH:MM AM/PM"
          />
        </div>
      ) : (
        <div className="preview">
          {language || timing ? (
            <>
              {language && <div className="preview-item">{language}</div>}
              {timing && <div className="preview-item">{timing}</div>}
            </>
          ) : (
            <div className="placeholder">Click to edit</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SatsangCell;