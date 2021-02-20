import React, { useContext } from 'react';
import ProjectContext from '../../context/project/ProjectContext';
import TaskContext from '../../context/task/TaskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Task from './Task';

const TasksList = () => {

    //Context
    const { currentProject, deleteProject } = useContext(ProjectContext);
    const { projectTasks } = useContext(TaskContext);

    if (!currentProject) {
        return <h2>Select a project</h2>
    }

    return (
      <React.Fragment>
        <h2>Project: {currentProject.projectName}</h2>

        <ul className = "listado-tareas">
            {
                projectTasks.length === 0 ? 
               (
                   <li className = "tarea">
                       <p>No tasks</p>
                   </li>
               ) :
               (
                   <TransitionGroup>
                    {projectTasks.map((task) => (
                        <CSSTransition
                        key = {task._id}
                        timeout = {200}
                        classNames = "tarea"
                        >
                            <Task
                                task = {task}

                            />
                        </CSSTransition>
                    ))}
                   </TransitionGroup>

               )
            }
            <button
            className = "btn delete "
            onClick = {()=> deleteProject(currentProject._id)}
            >Delete Project &times;</button>
        </ul>

       
      </React.Fragment>
    );
}
 
export default TasksList;