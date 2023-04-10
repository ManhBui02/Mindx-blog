import { Link } from 'react-router-dom';
import { ImBin } from 'react-icons/im';

export default function BlogContainer({ data, adminMode, handleDelete }) {
    return (
        <div className="blog py-5 bg-light">
            <div className="px-4">
                <div className="row">
                    {
                        data.map(value => (
                            <div className="col-md-3" style={{position: 'relative'}} key={Math.floor(Math.random() * 9876543210)}>
                                {adminMode && <ImBin className='delete_post' onClick={e=>handleDelete(value.id)}/>}
                                <div className="card mb-4 shadow-sm">
                                    <img className="card-img-top" style={{height: 225, width: "100%", display: "block",}} src={value.thumbnail} alt="thumbnail" />
                                    <Link to={'/blog/' + value.id} className="card-body">
                                        <h5 className="card-title" style={{height: 48}}>{value.title}</h5>
                                        <p className="card-text">{value.content}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-muted">{value.category}</small>
                                            <small className="text-muted">{value.view} lượt xem</small>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}