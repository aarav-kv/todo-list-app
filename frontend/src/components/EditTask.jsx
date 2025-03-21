import "../styles/EditTask.css";
import { useState } from "react";

const EditTask = ({ taskData, closeEdit, saveTask, handleTaskDeletion }) => {
    const [taskTitle, setTaskTitle] = useState(taskData.taskName || "");
    const handleTaskDelete = (id) => {
        handleTaskDeletion(id);
        closeEdit();
    }
    return (
        <>
            <span className="backdrop" onClick={closeEdit}></span>
            <div className="editMenu">
                <div className="edit-header">
                    <span style={{ textAlign: "center", paddingTop: "5px" }}>Edit</span>
                    <button className="close-btn" onClick={closeEdit}>✕</button>
                </div>
                <div className="edit-content">
                    <div className="input-container">
                        <input
                            className="input-field"
                            type="text"
                            placeholder=" "
                            onChange={(e) => setTaskTitle(e.target.value)}
                            value={taskTitle}
                        />
                        <label>Task Name</label>
                        <span className="focus-bg"></span>
                    </div>
                    <div className="button-group">
                        <button className="delete-btn" onClick={() => { handleTaskDelete(taskData._id) }}>Delete</button>
                        <button className="cancel-btn" onClick={closeEdit}>Cancel</button>
                        <button className="save-btn" onClick={() => { saveTask(taskData._id, taskTitle) }}>Save</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditTask;
