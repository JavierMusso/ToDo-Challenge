import axios from "axios";
import { useEffect, useState } from "react";
import Folder from "./components/Folder/Folder";
import styles from "./App.module.css";

function App() {
  const [tasks, setTasks] = useState();
  const [input, setInput] = useState("");

  useEffect(() => {
    async function getTasks() {
      let { data } = await axios.get("/folders");
      return data;
    }

    getTasks().then(setTasks);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) createFolder(input);
    setInput("");
  };

  const createFolder = async (folderName) => {
    let { data } = await axios.post("/folders", { folderName: folderName });
    setTasks(data);
  };

  const deleteFolder = async (id) => {
    let { data } = await axios.delete("/folders", { data: { folderId: id } });
    setTasks(data);
  };

  return (
    <div className={styles.App}>
      <div className={styles.content}>
        <h1>ToDo App</h1>

        <form action="#" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Create folder ..."
            value={input}
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
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
