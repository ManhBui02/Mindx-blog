import { useState, useContext, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {AdminContext} from '../Context/AdminContext';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoadingStatus] = useState(false);
    const navigate = useNavigate();

    const {admin, checkAdmin} = useContext(AdminContext);

    const handleEmailChange = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        
        setLoadingStatus(true);

        checkAdmin(username, password)
        .then(isValidUser => {
            setLoadingStatus(false);

            if (isValidUser){
                navigate('/admin/dashboard');
            }else{
                alert("Invalid admin");
            }
        })
        .catch(e=>console.log(e))
    };

    useEffect(()=>{
        if (admin){
            navigate('/admin/dashboard');
        }
    }, [admin, navigate]);

    return (
        <div className="login_container">
            <form onSubmit={handleSubmit} className="login-form bg-light p-4 container rounded" style={{width: 400}}>
                <h2 className="mb-3">Xin chào Admin</h2>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="username"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className="text-end">
                    <button type="submit" className="btn btn-primary"> 
                        {isLoading ? 
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> : 
                        "Login"}
                    </button>
                </div>
            </form>
        </div>
    );
}