import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';

//Components
import ProjectContext from './ProjectContext';
import ProjectReducer from './ProjectReducer';

//Types
import {
    PROJECT_FORM,
    GET_PROJECTS,
    ADD_PROJECT,
    PROJECT_FORM_VALIDATION,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR
} from '../../types';



const ProjectState = props => {

    const initialState = {
        projects: [],
        currentProject: null,
        projectForm: false,
        projectFormError: false,
        message: null
    };

    //Dispatch to execute the actions
    const [state, dispatch] = useReducer(ProjectReducer, initialState);

    //Functions
    const showProjectForm = () => {
        dispatch({
            type: PROJECT_FORM
        })
    };

    const getProjects = async () => {

        try {
            const projects = await axiosClient.get("/api/projects");

            dispatch({
                type: GET_PROJECTS,
                payload: projects.data
            })

        } catch(err) {
            const alert = {
                msg: "There was an error",
                cat: "alerta-error"
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    };

    const addProject = async (project) => {

        try {
            const response = await axiosClient.post("/api/projects", project)
            dispatch({
                type: ADD_PROJECT,
                payload: response.data
            })
        } catch(err) {
            console.log(err.response.data)
        }
    }
    
    const validateProjectForm = () => {
        dispatch({
            type: PROJECT_FORM_VALIDATION
        })
    }

    const getCurrentProject = (projectId) => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: projectId
        })
    }

    const deleteProject = async (projectId) => {

        try {
            await axiosClient.delete(`/api/projects/${projectId}`)
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            });
        } catch(err) {
            const alert = {
                msg: "There was an error",
                cat: "alerta-error"
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }

    }

    return (
        <ProjectContext.Provider value = {{
            projectForm: state.projectForm,
            projects: state.projects,
            projectFormError: state.projectFormError,
            currentProject: state.currentProject,
            message: state.message,
            validateProjectForm,
            deleteProject,
            getCurrentProject,
            addProject,
            getProjects,
            showProjectForm
        }}>
            {props.children}
        </ProjectContext.Provider>
    )
};

export default ProjectState;