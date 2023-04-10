import { useState } from "react";

export default function Search({initial, setValue}){
    const [search, setSearch] = useState(initial);

    const handleSubmit = e => {
        e.preventDefault();
        setValue(search);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Tìm kiếm</h3>
            <div className="input-group mb-3">
                <input value={search} onChange={e=>setSearch(e.target.value)} type="text" className="form-control rounded" placeholder="Search anything"/>
                <div className="input-group-append ms-4">
                    <button className="btn btn-outline-secondary" type="button">Search</button>
                </div>
            </div>
        </form>
    );
}