import React from "react";
import { hydrateRoot } from "react-dom/client";
import "./styles.css";
import { byId } from "./routes.jsx";

const root = document.getElementById("root");
const route = byId[root.dataset.route] ?? byId["404"];
hydrateRoot(root, <React.StrictMode><route.Page /></React.StrictMode>);
