import React from "react";
import "./Box.css";

interface Props {
  title: string;
  subtitle?: string;
  onClick?: () => void;
}

const Box: React.FC<Props> = ({ title, subtitle, onClick }) => {
  return (
    <div className="box-card card" onClick={onClick} role="button">
      <h3 style={{color: "var(--accent-2)", margin:"0 0 8px 0"}}>{title}</h3>
      <p style={{color:"var(--muted)", margin:0}}>{subtitle}</p>
    </div>
  );
};

export default Box;
