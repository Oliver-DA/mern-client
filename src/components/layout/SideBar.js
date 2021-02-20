import React from 'react';

//Components
import NewProjectForm from '../projects/NewPorjectForm';
import ProjectsList from '../projects/ProjectsList';

const SideBar = () => {
    return (
        <aside>
            <h1>MERN<span>TASKS</span></h1>

            <NewProjectForm />

            <div className = "proyectos">
                <h2>Your Projects</h2>

                <ProjectsList />
            </div>
        </aside>
    );
}
 
export default SideBar;