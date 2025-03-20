import { useState } from "react";

const TaskCounter = ({ count }) => {

    const counterStyle = {
        borderRadius: "4px",
        backgroundColor: "#00000013",
        width: "20px",
        textAlign: "center",
        fontSize: ".7rem",
        height: "18px",
        color: "#00000099",
    }

    return (
        <>
            <span className="task-counter" style={counterStyle}> {count}</span>
        </>
    )
}

export default TaskCounter 