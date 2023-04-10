import BlogContainer from "../Components/BlogContainer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogModel from "../Models/Blog";
import AboutUs from "../Components/AboutUs";

export default function Home(){
    const [trending, setTrending] = useState([]);

    useEffect(()=>{
        BlogModel("", 4, setTrending);
    }, []);

    return (
        <div className="home">
            <div className="banner position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center text-light">
                <div className="col-md-6 p-lg-5 mx-auto my-5 rounded" style={{backgroundColor: 'rgba(134, 165, 184, .85)'}}>
                    <h1 className="display-4 font-weight-normal">Chào mừng đến với trang Blog</h1>
                    <p className="lead font-weight-normal" style={{color: 'var(--light-brown)'}}>Blog này được tạo bởi Phát và Mạnh trong đồ án cuối khóa Reactjs tại MindxDream</p>
                </div>
            </div>
            <div className="container text-center">
                <h1 className="jumbotron-heading">Những bài viết thịnh hành</h1>
                <p className="lead text-muted">Đây là những bài viết được độc giả đón nhận và truyền tay nhau nhiều nhất, hãy điểm qua top 4 bài viết đạt nhiều lượt xem nhất nhé!</p>
            </div>
            {trending.length === 0 ?
            <div className="spinner-border text-center" role="status">
                <span className="visually-hidden">Loading...</span>
            </div> :
            <BlogContainer data={trending}/>}
            
            <Link className="text-end px-5 pb-4 fs-3" style={{width: "100%", display: "block", color: "var(--brown)"}} to={'/blog'}>Xem thêm</Link>
            <div className="container text-center">
                <h1 className="jumbotron-heading">Thông tin về chúng tôi</h1>
                <p className="lead text-muted">Các độc giả nếu thấy hay thì có thể liên hệ và hỗ trợ chúng tôi qua các trang mạng xã hội được đính kèm bên dưới</p>
            </div>
            <AboutUs/>
        </div>
    );
}