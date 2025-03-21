
import { useEffect, useState } from "react";
import "../styles/TaskViewer.css";
import AddTask from "./AddTask";
import NavigationBar from "./NavigationBar";
import ListTask from "./ListTask";
import axios from "axios";
import EditTask from "./EditTask";
const TaskViewer = ({ setCount, activeMenu, toggleSideBar }) => {
    const [taskList, setTaskList] = useState([]);
    const [checkedTaskIds, setCheckedTaskIds] = useState([]);
    const [editTaskState, setEditTaskState] = useState({
        isEditing: false,
        taskData: null,
        edited: false
    });
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTaskList(storedTasks);

        if (navigator.onLine) {
            axios.get("https://todo-list-app-backend-tk2j.onrender.com/tasks")
                .then(response => {
                    setTaskList(response.data);
                    localStorage.setItem("tasks", JSON.stringify(response.data));
                })
                .catch(error => console.error("Error fetching tasks:", error));
        }
    }, []);

    useEffect(() => {
        console.log(taskList)
        if (navigator.onLine) {
            const unsyncedTasks = taskList.filter(task => task.syncStatus === "pending");
            // console.log(unsyncedTasks)
            unsyncedTasks.forEach(task => {
                axios.post("https://todo-list-app-backend-tk2j.onrender.com/tasks", task)
                    .then(() => {
                        task.syncStatus = "synced";
                        setTaskList([...taskList]);
                        localStorage.setItem("tasks", JSON.stringify(taskList));
                    })
                    .catch(error => console.error("Error syncing task:", error));
            });
        }
    }, [taskList]);

    useEffect(() => {
        setCount({
            total: taskList.length,
            importantTaskCount: taskList.filter(task => task.important).length,
            notImportantTaskCount: taskList.filter(task => !task.important).length
        });

        if (taskList.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(taskList));
        }
    }, [taskList, setCount]);

    const setTask = (task) => {
        setTaskList(prev => [...prev, task]);
    };

    const deleteTask = async (id = null) => {
        console.log(id)
        if (id != null) {
            handleCheckedTaskIds(id)
        }
        await axios.delete(`https://todo-list-app-backend-tk2j.onrender.com/tasks`, {
            data: { checkedTaskIds: checkedTaskIds }
        });

        setTaskList(prevTask => prevTask.filter((task) => !checkedTaskIds.includes(task._id)))
        if (taskList.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(taskList));
        }
    }

    const markTaskAsCompleted = () => {

    }

    useEffect(() => {
        const updateTask = async () => {
            if (!editTaskState.isEditing) return; // Prevent unnecessary calls
            if (!editTaskState.taskData.edited) return

            try {
                const response = await axios.put("https://todo-list-app-backend-tk2j.onrender.com/task", {
                    data: editTaskState.taskData
                });

                if (response.data.success) {
                    const newList = taskList.map((task) =>
                        task._id === editTaskState.taskData._id
                            ? { ...task, name: editTaskState.taskData.taskName }
                            : task
                    );

                    setTaskList(newList);
                }

            } catch (error) {
                console.error("Error syncing task:", error);
            }
        };

        updateTask();
    }, [editTaskState])

    const saveTask = (_id, taskName) => {
        setEditTaskState({ isEditing: true, taskData: { _id, taskName, edited: true } });
        console.log(taskName)
    }

    const editTask = (_id, taskName) => {
        setEditTaskState({ isEditing: true, taskData: { _id, taskName, edited: false } });
    }

    const closeEdit = () => {
        setEditTaskState({ isEditing: false, taskData: null, edited: false });
    };

    const handleCheckedTaskIds = (taskidarray) => {
        setCheckedTaskIds(taskidarray)
    }

    return (
        <div className="task-viewer-container" style={{ display: "flex", position: "relative" }}>
            <NavigationBar markTaskAsCompleted={markTaskAsCompleted} toggleSideBar={toggleSideBar} />
            {editTaskState.isEditing && <EditTask taskData={editTaskState.taskData} closeEdit={closeEdit} saveTask={saveTask} handleTaskDeletion={deleteTask} />}
            <ListTask taskList={taskList} activeMenu={activeMenu} handleCheckedTaskIds={handleCheckedTaskIds} handleEditTask={editTask} />
            <AddTask addTask={setTask} activeMenu={activeMenu} handleTaskDeletion={deleteTask} />
        </div>
    );
};

export default TaskViewer;
