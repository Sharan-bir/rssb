import React from "react";

interface Props{
  value:string;
  onChange:(v:string)=>void;
  onSearch?:()=>void;
  placeholder?:string;
}

const SearchBar:React.FC<Props> = ({value,onChange,onSearch,placeholder})=>{
  return (
    <input
      aria-label="search"
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      onKeyDown={(e)=> e.key === 'Enter' && onSearch?.()}
      placeholder={placeholder || 'Search by name...'}
      style={{
        padding:'10px 12px',
        borderRadius:10,
        border:'1px solid #e6eef9',
        boxShadow:'0 2px 8px rgba(16,24,40,0.03)',
        fontSize:'.95rem',
        flex:1
      }}
    />
  )
}

export default SearchBar;
