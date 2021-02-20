import {
    PROJECT_FORM,
    GET_PROJECTS,
    ADD_PROJECT,
    PROJECT_FORM_VALIDATION,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR
} from '../../types';

const ProjectReducer = (state, action) => {
    switch (action.type) {

        case PROJECT_FORM:
            return {
                ...state,
                projectForm: !state.projectForm,
                projectFormError: false
            }
        
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }

        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                currentProject: action.payload,
                projectFormError: false
            }

        case PROJECT_FORM_VALIDATION:
            return {
                ...state,
                projectFormError: true
            }

        case CURRENT_PROJECT:
            return {
                ...state,
                currentProject: state.projects.find(project => project._id === action.payload)
            }

        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                currentProject: null
            }

        case PROJECT_ERROR:
            return {
                ...state,
                message: action.payload
            }

        default: return state
    }
}

export default ProjectReducer;