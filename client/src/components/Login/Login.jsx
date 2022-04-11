import axios from "axios";
import React, { useState } from "react";
import styles from "./Login.module.css";

const Login = ({ getTasks, setUserId }) => {
  const [toggle, setToggle] = useState(true);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.username && input.password) {
      if (toggle) {
        let { data } = await axios.get("/users", {
          params: { username: input.username, password: input.password },
        });

        if (typeof data === "number") {
          getTasks(data);
          setUserId(data);
        }
      } else {
        let { data } = await axios.post("/users", {
          username: input.username,
          password: input.password,
        });
        console.log(data);

        getTasks(data.userId);
        setUserId(data.userId);
      }
    }
  };

  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggle = () => {
    setInput({
      username: "",
      password: "",
    });
    setToggle(!toggle);
  };

  return (
    <div className={styles.LoginSignUp}>
      <h1>ToDo App Ensolvers</h1>
      <div className={toggle ? styles.show : styles.hide}>
        <form action="#" onSubmit={handleSubmit} autoComplete="off">
          <input
            name="username"
            type="text"
            onChange={handleOnChange}
            value={input.username}
            maxLength="20"
            placeholder="Username"
            autoComplete="off"
            required
          />
          <input
            name="password"
            type="password"
            onChange={handleOnChange}
            value={input.password}
            maxLength="20"
            placeholder="****"
            autoComplete="off"
            required
          />
          <input type="submit" value="Log In" className={styles.submit} />
        </form>
      </div>

      <div className={toggle ? styles.hide : styles.show}>
        <form action="#" onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            onChange={handleOnChange}
            value={input.username}
            maxLength="20"
            placeholder="Username"
            autoComplete="false"
            required
          />
          <input
            name="password"
            type="password"
            onChange={handleOnChange}
            value={input.password}
            maxLength="20"
            placeholder="****"
            autoComplete="off"
            required
          />
          <input type="submit" value="Sign Up" className={styles.submit} />
        </form>
      </div>
      <button onClick={handleToggle}>
        {toggle
          ? "need an account? Sign Up"
          : "already have an account? Log In"}
      </button>
    </div>
  );
};

export default Login;
