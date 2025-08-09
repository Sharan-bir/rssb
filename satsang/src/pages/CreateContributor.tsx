import { useState, useEffect } from "react";
import "./CreateContributor.css";

type ContributorForm = {
  name: string;
  role: string;
  languages: string[];
  week_days: string[];
  phoneNumber: string;
  center: string;
  city: string;
  state: string;
  dateOfBirth: string;
  gender: string;
  isActive: boolean;
};

export default function CreateContributor() {
  const [form, setForm] = useState<ContributorForm>({
    name: "",
    role: "",
    languages: [],
    week_days: [],
    phoneNumber: "",
    center: "",
    city: "",
    state: "",
    dateOfBirth: "",
    gender: "",
    isActive: true,
  });

  const [languagesList, setLanguagesList] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3007/api/languages")
      .then((res) => res.json())
      .then((data) => setLanguagesList(data))
      .catch((err) => console.error("Error fetching languages:", err));
  }, []);

  const handle = (k: keyof ContributorForm, v: any) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  async function submit() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3007/api/contributors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text || "Server error");
      alert("Contributor created");
      setForm({
        name: "",
        role: "",
        languages: [],
        week_days: [],
        phoneNumber: "",
        center: "",
        city: "",
        state: "",
        dateOfBirth: "",
        gender: "",
        isActive: true,
      });
    } catch (e: any) {
      console.error(e);
      alert("Error creating contributor: " + (e.message || e));
    }
    setLoading(false);
  }

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const roles = ["PATHI", "KARTA", "READER"];
  const genders = ["MALE", "FEMALE", "OTHER"];

  return (
    <div>
      <h2 className="page-title">Create Contributor</h2>

      <div className="card" style={{ maxWidth: 720 }}>
        <div className="kicker">Add a new contributor</div>

        {/* Basic Info */}
        <label className="label">Name</label>
        <input value={form.name} onChange={(e) => handle("name", e.target.value)} placeholder="Full name" />

        <label className="label">Role</label>
        <select value={form.role} onChange={(e) => handle("role", e.target.value)}>
          <option value="">Select role</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>

        {/* New Fields */}
        <label className="label">Phone Number</label>
        <input value={form.phoneNumber} onChange={(e) => handle("phoneNumber", e.target.value)} placeholder="+91 9876543210" />

        <label className="label">Center</label>
        <input value={form.center} onChange={(e) => handle("center", e.target.value)} placeholder="Prem Vihar" />

        <label className="label">City</label>
        <input value={form.city} onChange={(e) => handle("city", e.target.value)} placeholder="Bangalore" />

        <label className="label">State</label>
        <input value={form.state} onChange={(e) => handle("state", e.target.value)} placeholder="Karnataka" />

        <label className="label">Date of Birth</label>
        <input type="date" value={form.dateOfBirth} onChange={(e) => handle("dateOfBirth", e.target.value)} />

        <label className="label">Gender</label>
        <select value={form.gender} onChange={(e) => handle("gender", e.target.value)}>
          <option value="">Select gender</option>
          {genders.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <label className="label checkbox-label">
          <input type="checkbox" checked={form.isActive} onChange={(e) => handle("isActive", e.target.checked)} />
          Active
        </label>

        {/* Languages */}
        <label className="label">Languages</label>
        <select multiple value={form.languages} onChange={(e) => handle("languages", Array.from(e.target.selectedOptions, opt => opt.value))}>
          {languagesList.map((lang) => (
            <option key={lang.id} value={lang.name}>{lang.name}</option>
          ))}
        </select>

        {/* Week Days */}
        <label className="label">Week Days</label>
        <div className="weekdays-container">
          {weekDays.map((day) => (
            <label key={day} className="checkbox-label">
              <input
                type="checkbox"
                checked={form.week_days.includes(day)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handle("week_days", [...form.week_days, day]);
                  } else {
                    handle("week_days", form.week_days.filter((d) => d !== day));
                  }
                }}
              />
              {day}
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button className="btn btn-primary" onClick={submit} disabled={loading}>
            {loading ? "Saving..." : "Create Contributor"}
          </button>
          <button
            className="btn btn-ghost"
            onClick={() =>
              setForm({
                name: "",
                role: "",
                languages: [],
                week_days: [],
                phoneNumber: "",
                center: "",
                city: "",
                state: "",
                dateOfBirth: "",
                gender: "",
                isActive: true,
              })
            }
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
