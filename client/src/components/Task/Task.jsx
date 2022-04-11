import React, { useState } from "react";
import styles from "./Task.module.css";
import axios from "axios";
import { MdModeEditOutline, MdOutlineClose } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";

const Task = ({ task, deleteTask, setTasks, userId }) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [input, setInput] = useState({
    taskId: task.id,
    task: task.task,
    status: task.status,
    userId: userId,
  });

  const updateTask = async (input) => {
    let { data } = await axios.put("/tasks", input);
    setTasks(data);
  };

  const handleEdit = () => {
    if (!toggleEdit) {
      setToggleEdit(!toggleEdit);
    } else {
      if (!input.task) return;
      updateTask(input);
      setToggleEdit(!toggleEdit);
    }
  };

  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatus = () => {
    if (input.status === "notStarted") {
      setInput({
        ...input,
        status: "inProgress",
      });
      return updateTask({
        ...input,
        status: "inProgress",
      });
    } else if (input.status === "inProgress") {
      setInput({
        ...input,
        status: "completed",
      });
      return updateTask({
        ...input,
        status: "completed",
      });
    } else {
      setInput({
        ...input,
        status: "notStarted",
      });
      return updateTask({
        ...input,
        status: "notStarted",
      });
    }
  };

  return (
    <li key={task.id} className={styles.Task}>
      <div className={styles.content}>
        <div className={styles.taskItem}>
          <button
            onClick={handleStatus}
            className={`${styles.toggleStatus} ${styles[input.status]}`}
          ></button>
          <p className={toggleEdit ? styles.hide : styles.show}>{input.task}</p>
          <form
            className={toggleEdit ? styles.show : styles.hide}
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit();
            }}
          >
            <input
              name="task"
              type="text"
              placeholder="new task"
              onChange={handleOnChange}
              value={input.task}
              maxLength="20"
            />
          </form>
        </div>
        <div className={styles.controls}>
          <button onClick={handleEdit} className={styles.edit}>
            {toggleEdit ? <BsCheckLg /> : <MdModeEditOutline />}
          </button>
          <button onClick={() => deleteTask(task.id)} className={styles.delete}>
            <MdOutlineClose />
          </button>
        </div>
      </div>
    </li>
  );
};

export default Task;
