import Filter from "../Components/Filter";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Search from "../Components/Search";
import BlogModel from "../Models/Blog";
import BlogContainer from "../Components/BlogContainer";

export default function Blog(){
    const categories = useMemo(()=>['Tất cả', 'Du lịch & Ẩm thực', 'Giáo dục', 'Kỹ năng', 'Khác'], []);

    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCategory, setCategory] = useState(useMemo(()=>searchParams.get('filter') || categories[0], [searchParams, categories]));
    const [search, setSearch] = useState(useMemo(()=>searchParams.get('search') || '', [searchParams,]));
    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{
        setSearchParams('filter=' + encodeURIComponent(selectedCategory) + '&search=' + encodeURIComponent(search));
        setBlogs([]);
    }, [selectedCategory, search, setSearchParams])

    useEffect(()=>{
        BlogModel(`AND(${selectedCategory === "Tất cả" ? "1" : `Category="${selectedCategory}"`}, ${search ? `REGEX_MATCH(LOWER(Title), LOWER(".*${search}.*"))` : "1"})`, 12, setBlogs);
    }, [selectedCategory, search, ])

    return (
        <div className="container p-4">
            <div className="row">
            <div className="col col-sm-2">
                    <Filter dataset={categories} selected={selectedCategory} setSelection={setCategory}/>
                </div>
                <div className="col col-md">
                    <Search initial={search} setValue={setSearch}/>
                    {
                        blogs.length === 0 ?
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                        <BlogContainer data={blogs}/>
                    }
                </div>
            </div>
        </div>
    );
}