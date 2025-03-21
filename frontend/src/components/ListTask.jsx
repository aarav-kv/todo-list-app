
import "../styles/TaskViewer.css";
import "../styles/AddTask.css";
import { useState, useEffect } from "react";
const ListTask = ({ taskList, activeMenu, handleCheckedTaskIds, handleEditTask }) => {

    //To show task based on the property we pass from the parent sidemenu.
    const filteredTasks = taskList.filter(task => {
        if (activeMenu === "Important") return task.important;          // Only important tasks
        if (activeMenu === "Tasks") return !task.important;             // Only non-important tasks
        return true;                                                   // All tasks for 'Home' or default
    });

    const [checkedTasks, storeCheckedTasks] = useState([])

    useEffect(function () {
        handleCheckedTaskIds(checkedTasks)
    }, [checkedTasks])

    const handleCheckboxChange = (e, newTaskID) => {
        storeCheckedTasks((prevTaskIDs) => {
            if (prevTaskIDs.includes(newTaskID)) {
                return prevTaskIDs.filter(id => id !== newTaskID);
            } else {
                return [...prevTaskIDs, newTaskID];
            }
        })
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                padding: "0 10px",
            }}
            className="minimal-scroll"
        >
            {
                filteredTasks.slice().reverse().map((task) => (
                    <span className='taskcard' key={task._id}>
                        <span style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            height: "50px",
                            lineHeight: "50px"
                        }}>
                            {/* <label className="modern-checkbox">
                                <input type="checkbox" key={task._id} onChange={() => { handleCheckboxChange(task._id) }} />
                                <span className="checkmark"></span>
                            </label> */}

                            <div className="checkbox-wrapper-43">
                                <input type="checkbox" id={`cbx-${task._id}`}
                                    onChange={(e) => { handleCheckboxChange(e, task._id); }}
                                />
                                <label htmlFor={`cbx-${task._id}`} className="check" >
                                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                                        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                        <polyline points="1 9 7 14 15 4"></polyline>
                                    </svg>
                                </label>
                            </div>

                            <label style={{ margin: "0 10px", fontSize: "13px", width: "100%" }}
                                className={checkedTasks.includes(task._id) || task.completed ? "task-completed" : ""}
                                onClick={() => {
                                    console.log("Parent Click Triggered");
                                    handleEditTask()
                                }}>{task.name}</label>
                            {/* <span style={{ margin: "0 10px", fontSize: "13px" }}>{task.name}</span> */}
                        </span>
                        {task.important ? <span><i style={{ fontSize: "15px", color: "" }} className="fa-regular fa-star"></i></span> : null}
                    </span>
                ))
            }
        </div >
    );
};

export default ListTask;
