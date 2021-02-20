import React, { useContext } from 'react';
import TaskContext from '../../context/task/TaskContext';
import { GiCheckMark, GiCancel} from 'react-icons/gi'

const Task = ({ task }) => {

    const {
        deleteTask,
        getProjectTasks,
        getCurrentTask,
        updateTask,
    } = useContext(TaskContext);


    //Handlers
    const handleDelete = () => {
        deleteTask(task._id, task.projectId);
        getProjectTasks(task.projectId);
    }

    const handleTaskChange = (task) => {
        task.state = !task.state
        updateTask(task);
    }

    const taskEdit = (task) => {
        getCurrentTask(task);
    }

    return ( 
        <li className = "tarea sombra">
            <p>{task.name}</p>

            <div className = "estado">
                {
                    task.state ? (
                        <button
                        className = "completo"
                        onClick = {()=> handleTaskChange(task)}
                        ><GiCheckMark /></button>
                    ) :
                    (
                        <button
                        className = "incompleto"
                        onClick = {()=> handleTaskChange(task)}
                        ><GiCancel /></button>
                    )
                }
            </div>

            <div className = "acciones">
                <button className = "btn btn-primario" onClick = {()=> taskEdit(task)}>Edit</button>

                <button className = "btn btn-secundario delete" onClick = {handleDelete}>Delete Task</button>
            </div>
        </li>
    );
}
 
export default Task;