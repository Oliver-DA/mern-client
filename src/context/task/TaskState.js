import React, { useReducer }from 'react';
import TaskContext from './TaskContext'
import TaskReducer from './TaskReducer';
import axiosClient from '../../config/axios';

import { 
    GET_TASKS,
    ADD_TASK,
    TASK_FORM_VALIDATION,
    DELETE_TASK,
    CURRENT_TASK,
    EDIT_TASK
} from '../../types';

const TasktState = (props) => {

    const initialState = {
        projectTasks: [],
        taskFormError: false,
        currentTask: null
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    //Functions
    const getProjectTasks = async (projectId) => {

        try {
            const response = await axiosClient.get("api/tasks", { params: {projectId}})
            dispatch({
                type: GET_TASKS,
                payload: response.data.tasks
            });

        } catch(err) {
            console.log(err.response.data)
        }
    }

    const addTask = async (task) => {

        try {
            const response = await axiosClient.post("/api/tasks", task);
            dispatch({
                type: ADD_TASK,
                payload: response.data.task
            });

        }catch(err) {
            console.log(err.response.data)
        }
    }

    const taskFormValidation = () => {
        dispatch({
            type: TASK_FORM_VALIDATION
        })
    }

    const deleteTask = async (id, projectId) => {

        try {
            await axiosClient.delete(`/api/tasks/${id}`, {params: {projectId}});

            dispatch({
                type: DELETE_TASK,
                payload: id
            })

        } catch(err) {
            console.log(err.response.data)
        }

    }

    const getCurrentTask = (task) => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    const updateTask = async (task) => {
        try {
            const response = await axiosClient.put(`api/tasks/${task._id}`, task)
            dispatch({
                type: EDIT_TASK,
                payload: response.data.task
            })
        } catch(err) {
            console.log(err.response.data)
        }
    }

    return (
        <TaskContext.Provider value = {{
            projectTasks: state.projectTasks,
            taskFormError: state.taskFormError,
            currentTask: state.currentTask,
            getCurrentTask,
            getProjectTasks,
            deleteTask,
            addTask,
            taskFormValidation,
            updateTask
        }}>
            {props.children}
        </TaskContext.Provider>
    )
};

export default TasktState;