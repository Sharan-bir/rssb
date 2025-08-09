import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import ManageContributors from "./pages/ManageContributors";
import CreateContributor from "./pages/CreateContributor";
import LanguagePage from "./pages/LanguagePage";
import Satsang from "./pages/Satsang";

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="brand">
          <div className="logo">SM</div>
          <div>
            <h1>Satsang Management</h1>
            <div className="kicker">Dashboard</div>
          </div>
        </div>

        <nav className="nav-links">
          <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/contributors" className={({isActive}) => isActive ? 'active' : ''}>Contributors</NavLink>
          <NavLink to="/languages" className={({isActive}) => isActive ? 'active' : ''}>Languages</NavLink>
          <NavLink to="/satsang" className={({isActive}) => isActive ? 'active' : ''}>Satsang</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contributors" element={<ManageContributors />} />
        <Route path="/languages" element={<LanguagePage />} />
        <Route path="/create-contributor" element={<CreateContributor />} />
        <Route path="/satsang" element={<Satsang />} />
      </Routes>
    </div>
  );
}
