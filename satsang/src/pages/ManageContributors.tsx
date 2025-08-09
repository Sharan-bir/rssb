import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import "./ManageContributors.css";
import { useNavigate } from "react-router-dom";

type Contributor = {
  id?: number;
  name: string;
  phoneNumber?: string;
  center?: string;
  city?: string;
  state?: string;
  dateOfBirth?: string;
  gender?: string;
  role?: string;
  isActive?: boolean;
  languages?: number[];
  daysOfWeek?: number[];
  [k:string]: any;
};

export default function ManageContributors(){
  const nav = useNavigate();
  const [query, setQuery] = useState('');
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [languagesFilter, setLanguagesFilter] = useState<number | ''>('');
  const [dayFilter, setDayFilter] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [viewItem, setViewItem] = useState<Contributor | null>(null);

  async function fetchAll(){
    setLoading(true);
    try{
      const res = await fetch('http://localhost:3007/api/contributors');
      const data = await res.json();
      setContributors(Array.isArray(data)?data:[]);
    }catch(e){ console.error(e); }
    setLoading(false);
  }

  useEffect(()=>{ fetchAll() },[]);

  // search by name
  async function handleSearch(){
    if(!query){ fetchAll(); return; }
    setLoading(true);
    try{
      const url = `http://localhost:3007/api/contributors/search?name=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      const data = await res.json();
      setContributors(Array.isArray(data)?data:[]);
    }catch(e){ console.error(e) }
    setLoading(false);
  }

  // language-day filter
  async function handleLanguageDayFilter(){
    // API expects payload maybe via query or POST; using GET with params asumingly
    setLoading(true);
    try{
      // We'll attempt GET with query params language and day
      const params = new URLSearchParams();
      if(languagesFilter) params.append('language', String(languagesFilter));
      if(dayFilter) params.append('day', String(dayFilter));
      const url = `http://localhost:3007/api/contributors/language-day?${params.toString()}`;
      const res = await fetch(url);
      const data = await res.json();
      setContributors(Array.isArray(data)?data:[]);
    }catch(e){ console.error(e) }
    setLoading(false);
  }

  async function handleDelete(id?: number){
    if(!id) return;
    if(!confirm('Delete this contributor?')) return;
    try{
      const res = await fetch(`http://localhost:3007/api/contributors/${id}`, { method:'DELETE' });
      if(res.ok) {
        setContributors(prev => prev.filter(x => x.id !== id));
        alert('Deleted');
      } else {
        const txt = await res.text();
        alert('Delete failed: '+txt);
      }
    }catch(e){ console.error(e); alert('Delete error'); }
  }

  return (
    <div>
      <h2 className="page-title">Manage Contributors</h2>

    <div className="filter-section">
  <div className="filter-card">
    <div className="filter-row">
      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        placeholder="Search contributors by name..."
      />
      <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      <button className="btn btn-success" onClick={() => nav('/languages')}>Add Language</button>
      <button className="btn btn-ghost" onClick={() => nav('/create-contributor')}>Add Contributor</button>
    </div>

    <div className="filter-row">
      <select
        value={languagesFilter}
        onChange={(e) => setLanguagesFilter(e.target.value ? Number(e.target.value) : '')}
      >
        <option value="">Filter by language (optional)</option>
        <option value="1">Language 1</option>
        <option value="2">Language 2</option>
      </select>

      <select
        value={dayFilter}
        onChange={(e) => setDayFilter(e.target.value ? Number(e.target.value) : '')}
      >
        <option value="">Filter by day (optional)</option>
        <option value="1">Monday</option>
        <option value="2">Tuesday</option>
        <option value="3">Wednesday</option>
        <option value="4">Thursday</option>
        <option value="5">Friday</option>
        <option value="6">Saturday</option>
        <option value="7">Sunday</option>
      </select>

      <button className="btn btn-primary" onClick={handleLanguageDayFilter}>Apply</button>
      <button className="btn btn-ghost" onClick={fetchAll}>Reset</button>
    </div>
  </div>
</div>


      <div className="card">
        <h3 style={{margin:'0 0 8px 0'}}>Contributors</h3>
        <div className="kicker">Showing {contributors.length} results {loading && ' – Loading...'}</div>

        <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:8}}>
          {contributors.length === 0 && <div style={{color:'var(--muted)'}}>No contributors found.</div>}
          {contributors.map((c)=>(
            <div key={c.id ?? Math.random()} className="contrib-row">
              <div>
                <div style={{fontWeight:700,color:'var(--accent-2)'}}>{c.name}</div>
                <div style={{fontSize:'.9rem', color:'var(--muted)'}}>{c.center ?? ''} • {c.city ?? ''}</div>
              </div>

              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <button className="btn btn-ghost" onClick={async ()=>{
                  // fetch full details if endpoint returns single by id or returns full list:
                  if(c.id){
                    try{
                      const res = await fetch(`http://localhost:3007/api/contributors/${c.id}`);
                      const data = await res.json();
                      setViewItem(data);
                    }catch(e){ console.error(e); setViewItem(c) }
                  } else {
                    setViewItem(c)
                  }
                }}>View</button>

                <button className="btn btn-success" onClick={()=>nav('/add-contributor')}>Update</button>
                <button className="btn btn-danger" onClick={()=>handleDelete(c.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {viewItem && (
        <div className="modal-backdrop" onClick={()=>setViewItem(null)}>
          <div className="modal card" onClick={(e)=>e.stopPropagation()}>
            <h3 style={{marginTop:0}}>{viewItem.name}</h3>
            <div style={{color:'var(--muted)', marginBottom:8}}>Center: {viewItem.center} • City: {viewItem.city}</div>
            <pre style={{whiteSpace:'pre-wrap',fontSize:'.95rem',color:'#333'}}>{JSON.stringify(viewItem,null,2)}</pre>
            <div style={{display:'flex',gap:8, justifyContent:'flex-end', marginTop:12}}>
              <button className="btn btn-ghost" onClick={()=>setViewItem(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
