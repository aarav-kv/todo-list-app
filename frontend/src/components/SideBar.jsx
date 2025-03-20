import { useEffect, useState } from "react";
import "../styles/SideBar.css";
import TaskSearchBar from "./TaskSearchBar";
import TaskCounter from "./TaskCounter";

const SideBar = ({ count, propName }) => {
    const [activeItem, setActiveItem] = useState("Home"); // Default active item
    const [isOpen, setIsOpen] = useState(false); // Sidebar open/close for mobile

    useEffect(() => {
        propName(activeItem);
    }, [activeItem]);

    const handleActive = (item) => {
        setActiveItem(item);
        setIsOpen(false); // Close sidebar on selecting an item (optional)
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Hamburger menu icon */}
            <div className="hamburger" onClick={toggleSidebar}>
                <i className="fa-solid fa-bars"></i>
            </div>

            {/* Sidebar */}
            <ul className={`side-bar ${isOpen ? "open" : ""}`}>
                <li className="page-title">To-Do</li>
                <li><TaskSearchBar position={"sidebar"} /></li>

                <li
                    className={`option ${activeItem === "Home" ? "active" : ""}`}
                    onClick={() => handleActive("Home")}
                >
                    <div><i className="fa-solid fa-house"></i><span>Home</span></div>
                    <TaskCounter count={count.notImportantTaskCount + count.importantTaskCount} />
                </li>

                <li
                    className={`option ${activeItem === "Important" ? "active" : ""}`}
                    onClick={() => handleActive("Important")}
                >
                    <div><i className="fa-solid fa-star"></i><span>Important</span></div>
                    <TaskCounter count={count.importantTaskCount} />
                </li>

                <li
                    className={`option ${activeItem === "Tasks" ? "active" : ""}`}
                    onClick={() => handleActive("Tasks")}
                >
                    <div><i className="fa-solid fa-clipboard-check"></i><span>Tasks</span></div>
                    <TaskCounter count={count.notImportantTaskCount} />
                </li>
            </ul>
        </>
    );
};

export default SideBar;
