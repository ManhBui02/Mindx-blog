import { useState, useRef, Fragment, useEffect, useContext } from "react";
import { selectComments, createComment } from "../Models/Comment";
import { AdminContext } from "../Context/AdminContext";
import { ImBin } from 'react-icons/im';
import base from "../DataBase";

export default function Comment({ blogId }) {
    const [commenter, setCommenter] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const submitRef = useRef(null);
    const {admin} = useContext(AdminContext);

    const [commentList, setCommentList] = useState([]);

    const handleNickname = e => {
        if (e.target.value.length <= 32) {
            setCommenter(e.target.value);
        }
    }

    const handleComment = e => {
        if (e.target.value.length <= 150) {
            setCommentContent(e.target.value);
        }
    }

    const handleKeyDown = e => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            submitRef.current.click();
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        const nickName = commenter ? commenter : admin ? 'Quản trị viên' : 'Người dùng ẩn danh';

        setCommentList([{ name: nickName, content: commentContent }, ...commentList]);

        createComment(blogId, nickName, commentContent);

        setCommentContent('');
    }

    useEffect(() => {
        selectComments(blogId, setCommentList);
    }, [blogId])

    const getRelativeTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
        const units = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1,
        };
        let timeDisplay = '';
        for (const [unit, seconds] of Object.entries(units)) {
            const count = Math.floor(diffSeconds / seconds);
            if (count > 0) {
                timeDisplay = `${count} ${unit}${count === 1 ? '' : 's'} ago`;
                break;
            }
        }
        return timeDisplay;
    };

    const handleDelete = id => {
        base('Comment').update(id, {
            "isDeleted": true
        }, {typecast: true}, function(err, record) {
            if (err) {
                console.error(err);
                return;
            }
            setCommentList([...commentList.filter(obj=>obj.id !== id)])
        })
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit} className="login-form">
                <h3 className="mb-4">Bình luận</h3>
                {
                    !admin &&
                    <div className="mb-3">
                        <label className="form-label">Tên bạn muốn hiển thị (hoặc để trống nếu bạn muốn ẩn danh):</label>
                        <input value={commenter} onChange={handleNickname} type="text" className="form-control" placeholder="Ví dụ: Bật nắp quan tài hôn em lần cuối =))" />
                    </div>
                }
                <div className="mb-3">
                    <label className="form-label">Bình Luận:</label>
                    <textarea value={commentContent} className="form-control" onKeyDown={handleKeyDown} onChange={handleComment} rows="3" placeholder="Ví dụ: Bài viết hay quá!" required></textarea>
                </div>
                <div className="text-end">
                    <button ref={submitRef} type="submit" className="btn btn-primary">Gửi</button>
                </div>
            </form>

            <hr className="hr my-4" />

            <h3 className="mb-4">Tất cả bình luận</h3>

            {
                commentList.map(value => (
                    <div key={Math.floor(Math.random() * 987654321)} className="card mb-4" style={{position: 'relative'}}>
                        {admin && <ImBin className='delete_post' onClick={e=>handleDelete(value.id)}/>}
                        <div className="card-header">
                            <small className="text-mute">{value.name}</small>
                        </div>
                        <div className="card-body">
                            {value.content}
                        </div>
                        <div className="card-footer">
                            <small className="text-mute">{getRelativeTime(value.Date_Created)}</small>
                        </div>
                    </div>
                ))
            }
        </Fragment>
    );
}