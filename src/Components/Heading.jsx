import { NavLink, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Heading(){
    const handleActive = param => {
        return `navigate_button ${param.isActive ? "active": ""}`;
    }

    const [dropdownStatus, setDropdownStatus] = useState("dropdown_content_container");
    const toggleDropdown = () => {
        if (dropdownStatus.includes("active")){
            setDropdownStatus("dropdown_content_container");
        }else{
            setDropdownStatus("dropdown_content_container active");
        }
    }

    const dropdownRef = useRef(null);

    const handleClickOutsideDropdown = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownStatus("dropdown_content_container");
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutsideDropdown);
        return () => {
            document.removeEventListener("click", handleClickOutsideDropdown);
        };
    }, []);
    
    return (
        <header id="header_container">
            <Link to='/' id="header_logo">BLOG</Link>
            <div id="navigation">
                <NavLink className={handleActive} to={'/'}>Trang chủ</NavLink>
                <div ref={dropdownRef} onClick={toggleDropdown} className="dropdown_menu">
                    <div className="dropdown_title navigate_button">Chủ đề</div>
                    <ul className={dropdownStatus}>
                        <li className="dropdown_content"><Link className="navigate_button" to={'/blog?filter=Du+lịch+%26+Ẩm+thực'}> Du lịch &#38; Ẩm thực </Link></li>
                        <li className="dropdown_content"><Link className="navigate_button" to={'/blog?filter=Giáo+dục'}> Giáo dục </Link></li>
                        <li className="dropdown_content"><Link className="navigate_button" to={'/blog?filter=Kỹ+năng'}> Kỹ năng </Link></li>
                        <li className="dropdown_content"><Link className="navigate_button" to={'/blog?filter=Khác'}> Khác </Link></li>
                    </ul>
                </div>
            </div>
        </header>
    );
}