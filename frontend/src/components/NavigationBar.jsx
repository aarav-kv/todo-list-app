import { useState, useEffect } from "react";
import eveningIcon from "../assets/evening-icon.svg";
import nightIcon from "../assets/night-icon.svg";
import morningIcon from "../assets/morning-icon.svg";
import "../styles/NavigationBar.css";
import TaskSearchBar from "./TaskSearchBar.jsx";

const NavigationBar = ({ deleteTask }) => {
    const [message, setMessage] = useState("");
    const [icon, setIcon] = useState(morningIcon); // default icon

    const hours = new Date().getHours();

    useEffect(() => {
        if (hours < 12) {
            setMessage("Good morning");
            setIcon(morningIcon);
        } else if (hours < 18) {
            setMessage("Good afternoon");
            setIcon(eveningIcon);
        } else if (hours < 21) {
            setMessage("Good evening");
            setIcon(eveningIcon);
        } else {
            setMessage("Hi");
            setIcon(nightIcon);
        }
    }, [hours]);

    function handleDeleteTask() {
        deleteTask();
    }

    function completeTask() {

    }

    return (
        <div className="nav-container">
            <div className="greetContainer">
                <div className="greet-header">
                    <img src={icon} className="greetIcon" alt="Greeting Icon" />
                    <span className="greet-message">{message}, Aarav</span>
                </div>
                <span className="greet-subtext">It's Wednesday, Jun 27</span>
            </div>
        </div>
    );
};

export default NavigationBar;
