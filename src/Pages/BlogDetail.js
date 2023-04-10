import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import BlogDetailModel from '../Models/BlogDetail';
import ViewCountModel from '../Models/ViewCount';
import Comment from '../Components/Comment';
import BackToTop from '../Components/BackToTop';

export default function Blog(){
    const {id} = useParams();

    const [detail, setDetail] = useState(null);

    useEffect(()=>{
        BlogDetailModel(id, setDetail);
        const countView = setTimeout(()=>{
            ViewCountModel(id);
        }, 1000);

        return () => clearTimeout(countView);
    }, [id]);

    return (
        <div className='container-md p-4'>
        {
            !detail ?
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div> :
            <Fragment>
                <h1 className='text-lead'>{detail.Title}</h1>
                <h5 className='text-muted'>{detail['Date Created']} - Thể loại: {detail.Category} - <b>{detail.View} Lượt xem</b></h5>
                <img style={{maxHeight: 300, width: 'auto', margin: '12px 0'}} src={detail.Thumbnail[0].url} alt='banner'/>
                {
                    detail.Content.split('\n').map(value => (
                        <p key={Math.floor(Math.random() * 987372672324)} style={{fontSize: 20}}>{value}</p>
                    ))
                }
                <hr className="hr my-4" />
                <Comment blogId={id}/>
                <BackToTop/>
            </Fragment>
        }
        </div>
    );
}