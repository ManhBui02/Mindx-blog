export default function Filter({dataset, selected, setSelection}){
  return (
    <div className="form-group">
      <label htmlFor="category"><h3>Danh mục</h3></label>
      {dataset.map(value => (
        <div className="form-check" key={value}>
          <input
            className="form-check-input"
            type="radio"
            name="category"
            id={`category-${value}`}
            value={value}
            checked={selected === value}
            onChange={e=>setSelection(e.target.value)}
          />
          <label className="form-check-label" htmlFor={`category-${value}`}>
            {value}
          </label>
        </div>
      ))}
    </div>
  );
};
