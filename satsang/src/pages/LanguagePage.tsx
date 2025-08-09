import { useState } from "react";
import "./LanguagePage.css";

type LanguageForm = {
  code: string;
  name: string;
  nativeName: string;
  isoCode: string;
  isActive: boolean;
  displayOrder: number;
  description: string;
  // createdDate/lastModified optional; backend often sets these
};

export default function LanguagePage(){
  const [form, setForm] = useState<LanguageForm>({
    code:'', name:'', nativeName:'', isoCode:'', isActive:true, displayOrder:0, description:''
  });
  const [loading, setLoading] = useState(false);

  const handle = (k:keyof LanguageForm, v:any) => setForm(prev => ({...prev, [k]:v}));

  async function submit(){
    // minimal payload — include fields backend expects
    const payload:any = {
      code: form.code,
      name: form.name,
      nativeName: form.nativeName,
      isoCode: form.isoCode,
      isActive: form.isActive,
      displayOrder: Number(form.displayOrder),
      description: form.description,
      createdDate: new Date().toISOString(),
      lastModifiedDate: new Date().toISOString()
    };

    setLoading(true);
    try{
      const res = await fetch('http://localhost:3007/api/languages', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      const text = await res.text();
      if(!res.ok) throw new Error(text || 'Server error');
      alert('Language created');
      setForm({code:'',name:'',nativeName:'',isoCode:'',isActive:true,displayOrder:0,description:''});
    }catch(e:any){
      console.error(e);
      alert('Error creating language: ' + (e.message || e));
    }
    setLoading(false);
  }

  return (
    <div>
      <h2 className="page-title">Create Language</h2>

      <div className="card" style={{maxWidth:720}}>
        <div className="kicker">Add a new language to the system</div>

        <label className="label">Code</label>
        <input value={form.code} onChange={(e)=>handle('code', e.target.value)} placeholder="resource code" />

        <label className="label">Name</label>
        <input value={form.name} onChange={(e)=>handle('name', e.target.value)} placeholder="English" />

        <label className="label">Native name</label>
        <input value={form.nativeName} onChange={(e)=>handle('nativeName', e.target.value)} placeholder="English" />

        <label className="label">ISO Code</label>
        <input value={form.isoCode} onChange={(e)=>handle('isoCode', e.target.value)} placeholder="EN" />

        <label className="label">Description</label>
        <textarea value={form.description} onChange={(e)=>handle('description', e.target.value)} placeholder="Optional description" />

        <div style={{display:'flex',gap:10,marginTop:12}}>
          <button className="btn btn-primary" onClick={submit} disabled={loading}>{loading ? 'Saving...' : 'Create Language'}</button>
          <button className="btn btn-ghost" onClick={()=>setForm({code:'',name:'',nativeName:'',isoCode:'',isActive:true,displayOrder:0,description:''})}>Reset</button>
        </div>
      </div>
    </div>
  )
}
