import { useState, useEffect } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai'

export default function BackToTop() {
    const [position, setPosition] = useState(0);
    const [backVisible, setBackVisible] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setBackVisible(window.scrollY < position && window.scrollY > 200 && !isScrolling)
            setPosition(window.scrollY);
        }
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [position, isScrolling,]);

    const scrollToTop = () => {
        setIsScrolling(true);

        let back = setInterval(() => {
            window.scrollBy(0, -position / 5);
            if (window.scrollY <= 0) {
                setIsScrolling(false);
                clearInterval(back);
            }
        }, 10);
    }

    return (
        <div id="back_wrap" className={backVisible ? "active" : ""} onClick={scrollToTop}>
            <AiOutlineArrowUp id="back_icon"/>
        </div>
    );
}