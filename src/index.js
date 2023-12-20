import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-multi-carousel/lib/styles.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";  
import { TaskProvider } from "./context/TaskContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <div id="wrapper">   
    <TaskProvider >  
    <DndProvider backend={HTML5Backend}>   
      <App />
    </DndProvider>
    </TaskProvider>
     </div> 
  </React.StrictMode>
);
