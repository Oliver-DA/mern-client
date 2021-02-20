import React, { useContext } from 'react';
import ProjectContext from '../../context/project/ProjectContext';
import TaskContext from '../../context/task/TaskContext';
import { FaProjectDiagram } from 'react-icons/fa'

const Project = ({ project }) => {

    //Context
    const { getCurrentProject } = useContext(ProjectContext);
    const { getProjectTasks } = useContext(TaskContext);

    //Handlers
    const setProject = (id) => {
        getCurrentProject(id);
        getProjectTasks(id)
    }

    return (
        <li>
            <button
                onClick = {()=> setProject(project._id)}
                className = "project"
            ><FaProjectDiagram color = {"#ff33cc"}/> {project.projectName}</button>
        </li>
    );
}
 
export default Project;