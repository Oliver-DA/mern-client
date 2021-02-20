import React, { useState, useContext } from 'react';
import ProjectContext from '../../context/project/ProjectContext';

const NewProjectForm = () => {

    //Context
    const {
        projectForm,
        showProjectForm,
        addProject,
        validateProjectForm,
        projectFormError,
    } = useContext(ProjectContext);

    //State
    const [project, setProject] = useState({
        projectName: ""
    });

    const { projectName } = project;

    //handlers
    const handleChange = e => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (projectName === "") {
            validateProjectForm()
            return 
        }

        addProject(project);

        setProject({ projectName: ""})
    };

    return (
        <React.Fragment>
            <button
            className = "btn btn-block btn-primario"
            onClick = {()=> showProjectForm()}
            >New Project</button>

            {
                projectForm ? 
                (
                    <form onSubmit = {handleSubmit} className = "formulario-nuevo-proyecto">
                        <input
                            type = "text"
                            className = "input-text"
                            placeholder = "Project Name"
                            name = "projectName"
                            value = {projectName}
                            onChange = {handleChange}
                        />

                        <input
                            type = "submit"
                            className = "btn btn-primario btn-block"
                            value = "Add Project"
                        />
                    </form>
                ) : null
            }
            { projectFormError && <p className = "mensaje error">Project name is required</p> }
        </React.Fragment>
    );
}
 
export default NewProjectForm;