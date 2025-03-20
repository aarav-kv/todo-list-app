
import { useEffect, useState } from "react";
import "../styles/TaskViewer.css";
import AddTask from "./AddTask";
import NavigationBar from "./NavigationBar";
import ListTask from "./ListTask";
import axios from "axios";

const TaskViewer = ({ setCount, activeMenu }) => {
    const [taskList, setTaskList] = useState([]);
    const [checkedTaskIds, setCheckedTaskIds] = useState([]);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTaskList(storedTasks);

        if (navigator.onLine) {
            axios.get("http://localhost:5000/tasks")
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
                axios.post("http://localhost:5000/tasks", task)
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

    const deleteTask = async () => {
        await axios.delete(`http://localhost:5000/tasks/`, {
            data: { checkedTaskIds: checkedTaskIds }
        });

        setTaskList(prevTask => prevTask.filter((task) => !checkedTaskIds.includes(task._id)))
        if (taskList.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(taskList));
        }
    }

    const markTaskAsCompleted = () => {

    }

    const handleCheckedTaskIds = (taskidarray) => {
        setCheckedTaskIds(taskidarray)
    }
    return (
        <div className="task-viewer-container" style={{ display: "flex", position: "relative" }}>
            <NavigationBar markTaskAsCompleted={markTaskAsCompleted} />
            <ListTask taskList={taskList} activeMenu={activeMenu} handleCheckedTaskIds={handleCheckedTaskIds} />
            <AddTask addTask={setTask} activeMenu={activeMenu} handleTaskDeletion={deleteTask} />
        </div>
    );
};

export default TaskViewer;
