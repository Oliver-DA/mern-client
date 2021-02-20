import React, { useContext, useEffect, useState } from 'react';
import ProjectContext from '../../context/project/ProjectContext';
import TaskContext from '../../context/task/TaskContext';

const FormTask = () => {

    //State
    const [newTask, setNewTask] = useState({
        name: "",
        state: false
    })

    const { name } = newTask;

    //Context
    const { currentProject } = useContext(ProjectContext);

    const {
        getProjectTasks,
        addTask,
        taskFormError,
        taskFormValidation,
        currentTask,
        updateTask
    } = useContext(TaskContext);

    useEffect(()=> {

        if (currentTask) {
            setNewTask(currentTask);
            
        } else {
            setNewTask({ name: ""});
        }

    }, [currentTask])

    if (!currentProject) return null

    //Handlerso
    const handleSubmit = e => {
        e.preventDefault();

        if (name.trim() === "") {
            taskFormValidation();
            return 
        }

        if (currentTask) {
            updateTask(newTask);

        } else {
            newTask.projectId = currentProject._id;
            addTask(newTask);
        }

        getProjectTasks(currentProject._id);
    
        setNewTask({ name: "" })

    }

    return (
        <div className = "formulario">

            <form onSubmit = {handleSubmit}>
                <div className = "contenedor-input">
                    <input
                        type = "text"
                        className = "input-text"
                        placeholder ="Task Name"
                        name = "name"
                        value = {name}
                        onChange = {(e) => setNewTask({...newTask, name: e.target.value})}
                    />
                </div>

                <div className = "contenedor-input">
                    <input
                        type = "submit"
                        className = "btn btn-primario btn-submit btn-block"
                        value = { currentTask ? "Edit task" : "Add task"}
                    />
                </div>
            </form>

            { taskFormError && <p className = "mensaje error">Task name is required</p> }
        </div>

    );
}
 
export default FormTask;