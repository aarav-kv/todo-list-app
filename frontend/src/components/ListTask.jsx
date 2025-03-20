
import "../styles/TaskViewer.css";
import "../styles/AddTask.css";
import { useState, useEffect } from "react";
const ListTask = ({ taskList, activeMenu, handleCheckedTaskIds }) => {
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

    const handleCheckboxChange = (newTaskID) => {
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
                    <span
                        className='taskcard'
                        key={task._id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "white",
                            margin: "5px 0",
                            padding: "10px",
                            borderRadius: "7px",
                            background: "hsl(0, 0.00%, 100.00%)",
                            boxShadow: "rgb(137 137 137 / 15%) 4px 1px 11px 0px"
                        }}
                    >
                        <span style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <label className="modern-checkbox">
                                <input type="checkbox" key={task._id} onChange={() => { handleCheckboxChange(task._id) }} />
                                <span className="checkmark"></span>
                            </label>
                            <span style={{ margin: "0 10px", fontSize: "13px" }}>{task.name}</span>
                        </span>
                        {task.important ? <span><i style={{ fontSize: "15px", color: "" }} className="fa-regular fa-star"></i></span> : null}
                    </span>
                ))
            }
        </div>
    );
};

export default ListTask;
