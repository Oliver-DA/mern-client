import React, { useContext, useEffect } from 'react';

//Components
import SideBar from '../layout/SideBar';
import Header from '../layout/Header';
import FormTask from '../tasks/FormTask';
import TasksList from '../tasks/TasksList';
import { AuthContext } from '../../context/auth/AuthContext'

const Projects = () => {

    const { authenticatedUser } = useContext(AuthContext);

    useEffect(() => {
        authenticatedUser();
        // eslint-disable-next-line
    }, [])

    return (
        <div className = "contenedor-app">

            <SideBar />

            <div className = "seccion-principal">
                <Header />

                <main>

                    <FormTask />
                    <div className = "contenedor-tareas">
                        <TasksList />
                    </div>

                </main>
            </div>
        </div>
    );
}
 
export default Projects;