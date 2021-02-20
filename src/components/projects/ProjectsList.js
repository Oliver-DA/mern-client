import React, { useContext, useEffect } from 'react';
import { AlertContext } from '../../context/alert/AlertContext';

//Components
import Project from './Project';
import ProjectContext from '../../context/project/ProjectContext';

const ProjectsList = () => {

    //Context
    const { projects, getProjects, message } = useContext(ProjectContext);
    const { alert, showAlert } = useContext(AlertContext);

    useEffect(() => {

        if (message) {
            showAlert(message.msg, message.cat);
        }

        getProjects();
        // eslint-disable-next-line
    }, [message])

    if (projects.length === 0) {
        return <p>Start by creating a new project</p>
    };

    return (
        <ul className = "listado-proyectos">
            { alert && <div className = {`alerta ${alert.cat}`}>{alert.msg}</div> }
            {
                projects.map(project => (
                    <Project
                    key = {project._id}
                    project = {project} />
                ))
            }
        </ul>
    );
}
 
export default ProjectsList;