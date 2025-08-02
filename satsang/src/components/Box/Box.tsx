import React from 'react';
import { Link } from 'react-router-dom';
import './Box.css';

interface BoxProps {
  title: string;
  subtitle: string;
  link: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const Box: React.FC<BoxProps> = ({ title, subtitle, link, variant = 'primary' }) => {
  return (
    <Link to={link} className={`box-link ${variant}`}>
      <div className={`box ${variant}`}>
        <h3 className="box-title">{title}</h3>
        <p className="box-subtitle">{subtitle}</p>
      </div>
    </Link>
  );
};

export default Box;