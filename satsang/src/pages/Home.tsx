import { useNavigate } from "react-router-dom";
import Box from "../components/Box";
import "./Home.css";

export default function Home() {
  const nav = useNavigate();

  return (
    <div>
      <div className="row">
        <Box title="Manage Contributors" subtitle="Search, view, update, delete contributors" onClick={() => nav('/contributors')} />
        <Box title="Languages" subtitle="Create and manage languages" onClick={() => nav('/languages')} />
        {/* <Box title="Add Contributor" subtitle="Create a new contributor" onClick={() => nav('/add-contributor')} /> */}
        <Box title="Satsang Roaster" subtitle="Create and manage satsang roaster" onClick={() => nav('/satsang')} />
      </div>
    </div>
  );
}
