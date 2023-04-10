import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import Phat from '../Assets/phat.jpg';
import Manh from '../Assets/manh.jpg';

export default function AboutUs() {
    const member = [
        {
            img: Phat,
            name: "Lê Tấn Phát",
            pos: "Front-end web developer",
            fb: "",
            github: ""
        },
        {
            img: Manh,
            name: "Bùi Đức Mạnh",
            pos: "Front-end web developer",
            fb: "",
            github: ""
        },
    ];
    return (
        <div className='container py-4'>
            <div className="row">
                {
                    member.map(value => (
                        <div key={Math.floor(Math.random() * 987654321)} className="col-md-6 mb-4">
                            <div className="card shadow-sm h-100">
                                <img src={value.img} alt="My Avatar" className="card-img-top" />
                                <div className="card-body">
                                    <h2 className="card-title">{value.name}</h2>
                                    <p className="card-text">{value.pos}</p>
                                    <div className="social-links">
                                        <Link to={value.fb} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary me-2"><FaFacebook /></Link>
                                        <Link to={value.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark"><FaGithub /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};