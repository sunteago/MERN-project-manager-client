import React, { useReducer } from "react";
import TaskContext from "./TaskContext";
import TaskReducer from "./TaskReducer";
import axiosClient from "../../config/axios";

import {
  TASKS_PROJECT,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTIVE_TASK,
  UPDATE_TASK,
  CLEAN_TASK
} from "../../types";


const TaskState = props => {
  const initialState = {
    projectTasks: [],
    taskerror: false,
    selectedTask: null
  };

  //create dispatch
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  //creating functions

  //get tasks
  const getTasks = async project => {
    console.log('obtener tasks');
    try {
      const result = await axiosClient.get("/api/tasks", {
        params: { project }
      });
      
      dispatch({
          type: TASKS_PROJECT,
          payload: result.data.tasks
      })
    } catch (error) {
      console.log(error.response);
    }
  };


  
  //add task to selected project

  const addTask = async task => {
    try {
      const result = await axiosClient.post("/api/tasks", task);
      console.log(result);
      dispatch({
        type: ADD_TASK,
        payload: task
      });
    } catch (error) {
      console.log(error);
    }
  };

  //validate and show error if needed

  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK
    });
  };

  //delete task by id

  const deleteTask = async (id, project) => {
    try {
        await axiosClient.delete(`/api/tasks/${id}`, {params: {project}});
        dispatch({
            type: DELETE_TASK,
            payload: id
          });
    } catch (error) {
        
    }
  };


 //edit task

 const updateTask = async task => {
    try {
        const result = await axiosClient.put(`/api/tasks/${task._id}`, task)
        dispatch({
            type: UPDATE_TASK,
            payload: result.data.task
          });
    } catch (error) {
        console.log(error);
    }
  };

  //extract a task for editing
  const saveActiveTask = task => {
    dispatch({
      type: ACTIVE_TASK,
      payload: task
    });
  };

 

  //deletes the selected task

  const cleanTask = () => {
    dispatch({
      type: CLEAN_TASK
    });
  };
  return (
    <TaskContext.Provider
      value={{
        projectTasks: state.projectTasks,
        taskerror: state.taskerror,
        selectedTask: state.selectedTask,
        getTasks,
        addTask,
        validateTask,
        deleteTask,
        saveActiveTask,
        updateTask,
        cleanTask
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
