import React, { useState } from "react";
import axios from "axios";
import styles from "./Folder.module.css";
import Task from "../Task/Task";

const Folder = ({ folder, deleteFolder, setTasks, userId }) => {
  folder.tasks.sort((a, b) => a.id - b.id);
  const [input, setInput] = useState("");
  const [toggleShow, setToggleShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) createTask(input);
    setInput("");
  };

  const createTask = async (task) => {
    let { data } = await axios.post("/tasks", {
      task: task,
      folderId: folder.id,
      userId: userId,
    });
    setTasks(data);
  };

  const deleteTask = async (id) => {
    let { data } = await axios.delete("/tasks", {
      data: { taskId: id, userId: userId },
    });
    setTasks(data);
  };

  return (
    <div className={styles.Folder}>
      <div className={styles.title}>
        <h3>{folder.folderName}</h3>
        <div>
          <button onClick={() => setToggleShow(!toggleShow)}>
            {toggleShow ? "Hide" : "Show"}
          </button>
          <button onClick={() => deleteFolder(folder.id)}>Delete</button>
        </div>
      </div>
      <div className={toggleShow ? styles.show : styles.hide}>
        <ul>
          {folder.tasks.length ? (
            folder.tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  setTasks={setTasks}
                  userId={userId}
                />
              );
            })
          ) : (
            <li>No tasks in this folder.</li>
          )}
        </ul>
        <form action="#" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add task ..."
            value={input}
            maxLength="20"
          />
          <input type="submit" value="Add task" />
        </form>
      </div>
    </div>
  );
};

export default Folder;
