import { useState, useContext, useEffect } from "react";
import {useNavigate, Link} from 'react-router-dom';
import {AdminContext} from '../Context/AdminContext';
import BlogModel from "../Models/Blog";
import BlogContainer from "../Components/BlogContainer";
import base from "../DataBase";
import { FiRefreshCcw } from 'react-icons/fi'

export default function Dashboard(){
    const navigate = useNavigate();
    const {admin} = useContext(AdminContext);
    const [post, setPost] = useState([]);
    const [isRefreshing, setRefreshing] = useState(false);

    useEffect(()=>{
        if (!admin){
            navigate('/admin/login');
        }
    }, [admin, navigate]);

    useEffect(()=>{
        BlogModel("", 100, setPost);
    }, []);

    const deletePost = id => {

        base('Blog').update(id, {
            "isDeleted": true
        }, {typecast: true}, function(err, record) {
            if (err) {
                console.error(err);
                return;
            }
            setPost([...post.filter(obj=>obj.id !== id)])
        })
    }

    const handleRefresh = () => {
        setRefreshing(true);
        BlogModel("", 100, setPost);
    }

    useEffect(()=>{
        setRefreshing(false);
    }, [post])

    return (
        <div className="container p-4">
            <h1>Xin chào Admin</h1>

            <hr className="hr my-4"></hr>

            <h2 className="mb-3">Bạn muốn đăng bài mới? <Link style={{textDecoration: "underline"}} to="https://airtable.com/shreJrTjQIBhxnjJS" target="_blank" rel="noopener noreferrer">Click vào đây!</Link></h2>

            <h2>Sau đây là danh sách các bài blog đã đăng <FiRefreshCcw onClick={handleRefresh} className={`spin ${isRefreshing ? 'active' : ''}`}/></h2>
            <BlogContainer data={post} adminMode={true} handleDelete={deletePost}/>
        </div>
    );
}