
import { useState, useEffect } from "react";
import "../styles/Hamburger.css";
import isMobileView from "../hooks/isMobileView";

const CustomHamburger = ({ toggleSideBar }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        toggleSideBar(isOpen)
    }, [isOpen]);

    return (
        <>
            {
                isMobileView() &&
                (<div className="hamburger-menu" onClick={() => setIsOpen(!isOpen)}>
                    <div className={`bar ${isOpen ? "open" : ""}`}></div>
                    <div className={`bar ${isOpen ? "open" : ""}`}></div>
                    <div className={`bar ${isOpen ? "open" : ""}`}></div>
                </div>)
            }
        </>
    );
};

export default CustomHamburger;
