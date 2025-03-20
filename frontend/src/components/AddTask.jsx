import { useState, useEffect } from "react";
import "../styles/AddTask.css";
import MoreOption from "./MoreOption";

const AddTask = ({ addTask, activeMenu, handleTaskDeletion }) => {
    const [taskText, setTaskText] = useState("");
    const [searchText, setSearchText] = useState("");
    const [isSearchMode, setIsSearchMode] = useState(false); // Toggle input mode

    const handleAddTask = () => {
        if (taskText.trim()) {
            const newTask = {
                _id: Date.now(),
                name: taskText,  // Fixed variable name
                important: activeMenu === "Important",
                lastModifiedDate: new Date(),
                syncStatus: "pending",
            };
            addTask(newTask);
            setTaskText(""); // Fixed incorrect state setter
        }
    };


    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleAddTask();
        }
    };

    return (
        <>
            <MoreOption toggleSearchBar={() => setIsSearchMode(!isSearchMode)} handleTaskDeletion={handleTaskDeletion} />

            {/* Search Input (Visible when toggled) */}
            {isSearchMode ? (
                <div className="search-input-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        className="search-input"
                    />
                    <button className="search-button">🔍</button>
                </div>
            ) :
                < div className="task-input-container">
                    <input
                        type="text"
                        placeholder="Add a task..."
                        value={taskText}
                        onChange={(event) => setTaskText(event.target.value)}
                        onKeyDown={handleKeyDown}
                        className="task-input"
                    />
                    <button onClick={handleAddTask} className="add-button">+</button>
                </div >
            }
        </>
    );
};

export default AddTask;
