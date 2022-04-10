import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import axios from "axios";
import "./reset.css";

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
