import { useEffect, useState } from "react";
import "../styles/SideBar.css";
import TaskSearchBar from "./TaskSearchBar";
import TaskCounter from "./TaskCounter";

const SideBar = ({ count, propName, toggle }) => {
    const [activeItem, setActiveItem] = useState("Home"); // Default active item

    useEffect(() => {
        propName(activeItem);
    }, [activeItem]);

    const handleActive = (item) => {
        setActiveItem(item);
    };

    return (
        <>
            {/* Sidebar */}
            <ul className={`side-bar ${toggle ? "open" : ""}`}>
                <li className="page-title">ToDo</li>
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
