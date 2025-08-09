import React, { useEffect, useState } from "react";
import "./Satsang.css";

type Language = {
  id: number;
  name: string;
};

type ScheduleCell = {
  languageId: number | null;
  time: string;
};

type DayState = {
  enabled: boolean;
  weeks: ScheduleCell[];
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Satsang() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    contactPerson: ""
  });

  const [tableData, setTableData] = useState<DayState[]>(
    Array.from({ length: 7 }, () => ({
      enabled: false,
      weeks: Array.from({ length: 5 }, () => ({ languageId: null, time: "" }))
    }))
  );

  useEffect(() => {
    fetch("http://localhost:3007/api/languages")
      .then((res) => res.json())
      .then((data) => setLanguages(data))
      .catch((err) => console.error("Error fetching languages:", err));
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleDay = (dayIndex: number) => {
    const updated = [...tableData];
    updated[dayIndex].enabled = !updated[dayIndex].enabled;
    setTableData(updated);
  };

  const updateCell = (
    dayIndex: number,
    weekIndex: number,
    field: "languageId" | "time",
    value: string | number
  ) => {
    const updated = [...tableData];
    (updated[dayIndex].weeks[weekIndex] as any)[field] = value;
    setTableData(updated);
  };

  const handleSubmit = () => {
    const schedules = tableData
      .map((day, dayIndex) => {
        if (!day.enabled) return null;
        const languageIds = day.weeks
          .filter((cell) => cell.languageId !== null)
          .map((cell) => cell.languageId!) // non-null assertion
          .filter((v, i, arr) => arr.indexOf(v) === i); // unique
        return {
          dayOfWeek: dayIndex + 1,
          languageIds
        };
      })
      .filter(Boolean);

    const payload = { ...formData, schedules };
    console.log("Payload:", payload);

    fetch("http://localhost:3007/api/satsang-ghar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create satsang");
        return res.json();
      })
      .then((data) => {
        console.log("Satsang created:", data);
        alert("Satsang created successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Error creating satsang");
      });
  };

  return (
    <div className="satsang-container">
      <h2 className="satsang-title">Create Satsang</h2>

      {/* Top Form */}
      <div className="satsang-form">
        {["code", "name", "address", "city", "state", "phone", "contactPerson"].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="text"
              name={field}
              value={(formData as any)[field]}
              onChange={handleFormChange}
            />
          </div>
        ))}
      </div>

      {/* Schedule Table */}
      <table className="satsang-table">
        <thead>
          <tr>
            <th>Week</th>
            {days.map((day, i) => (
              <th key={day}>
                <div className="day-header">
                  <input
                    type="checkbox"
                    checked={tableData[i].enabled}
                    onChange={() => toggleDay(i)}
                  />
                  <span>{day}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }, (_, weekIdx) => (
            <tr key={weekIdx}>
              <td>Week {weekIdx + 1}</td>
              {days.map((_, dayIdx) => {
                const cell = tableData[dayIdx].weeks[weekIdx];
                const editable = tableData[dayIdx].enabled;
                return (
                  <td key={`${dayIdx}-${weekIdx}`}>
                    <select
                      disabled={!editable}
                      value={cell.languageId ?? ""}
                      onChange={(e) =>
                        updateCell(dayIdx, weekIdx, "languageId", Number(e.target.value))
                      }
                    >
                      <option value="">Select Language</option>
                      {languages.map((lang) => (
                        <option key={lang.id} value={lang.id}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="time"
                      disabled={!editable}
                      value={cell.time}
                      onChange={(e) => updateCell(dayIdx, weekIdx, "time", e.target.value)}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
