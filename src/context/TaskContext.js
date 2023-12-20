import React, { createContext, useReducer, useContext, useEffect } from 'react';
import {produce} from 'immer';
import { v4 as uuidv4 } from 'uuid';

const getLocalStorageData = () => {
  const storedData = localStorage.getItem('tasks');
  return storedData ? JSON.parse(storedData) : [];
};

const initialState = {
  tasks: getLocalStorageData(), 
};

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return produce(state, (draftState) => {
        draftState.tasks.push(action.payload);
      });
    case 'UPDATE_TASK':
      return produce(state, (draftState) => {
        const taskIndex = draftState.tasks.findIndex(task => task.id === action.payload.id);
        if (taskIndex !== -1) {
          draftState.tasks[taskIndex] = { ...draftState.tasks[taskIndex], ...action.payload.updatedTask };
        }
      });
    case 'DELETE_TASK':
      return produce(state, (draftState) => {
        const taskIndex = draftState.tasks.findIndex(task => task.id === action.payload.id);
        if (taskIndex !== -1) {
          draftState.tasks.splice(taskIndex, 1);
        }
      });
    case 'UPDATE_STATUS':
      return produce(state, (draftState) => {
        const taskIndex = draftState.tasks.findIndex(task => task.id === action.payload.id);
        if (taskIndex !== -1) {
          draftState.tasks[taskIndex].task_status = action.payload.status;
        }
      });
    default:
      return state;
  }
};


const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  const addTask = (task) => {
    const newTask = { ...task, id: uuidv4() };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };;

  const updateTask = (id, updatedTask) => {
    console.log(updatedTask);
    dispatch({ type: 'UPDATE_TASK', payload: { id, updatedTask } });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: { id } });
  };

  const updateStatus = (id, status) => {
    dispatch({ type: 'UPDATE_STATUS', payload: { id, status } });
  };

  return (
    <TaskContext.Provider value={{ state, addTask, updateTask, deleteTask, updateStatus }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export { TaskProvider, useTaskContext };
