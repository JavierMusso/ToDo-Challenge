import axios from "axios";
import { useState } from "react";
import Folder from "./components/Folder/Folder";
import styles from "./App.module.css";
import Login from "./components/Login/Login";

function App() {
  const [tasks, setTasks] = useState();
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState();

  async function getTasks(userId) {
    let { data } = await axios.get("/folders", {
      params: { userId: userId },
    });
    console.log(data);
    setTasks(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) createFolder(input);
    setInput("");
  };

  const createFolder = async (folderName) => {
    console.log(userId);
    let { data } = await axios.post("/folders", {
      folderName: folderName,
      userId: userId,
    });
    setTasks(data);
  };

  const deleteFolder = async (id) => {
    let { data } = await axios.delete("/folders", {
      data: { folderId: id, userId: userId },
    });
    setTasks(data);
  };

  const handleLogout = () => {
    window.location.reload(false);
  };

  return (
    <div className={styles.App}>
      {tasks ? (
        <div className={styles.content}>
          <h1>ToDo App</h1>
          <button onClick={handleLogout}>Log Out</button>
          <form action="#" onSubmit={handleSubmit}>
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Create folder ..."
              value={input}
              maxLength="20"
            />
            <input type="submit" value="Create" />
          </form>

          <ul>
            {tasks?.map((folder) => {
              return (
                <li key={folder.id}>
                  <Folder
                    folder={folder}
                    deleteFolder={deleteFolder}
                    setTasks={setTasks}
                    userId={userId}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <Login getTasks={getTasks} setUserId={setUserId} />
      )}
    </div>
  );
}

export default App;
