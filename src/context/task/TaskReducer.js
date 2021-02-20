import { 
    GET_TASKS,
    ADD_TASK,
    TASK_FORM_VALIDATION,
    DELETE_TASK,
    CURRENT_TASK,
    EDIT_TASK
} from '../../types';

const TaskReducer = (state, action) => {
    switch (action.type) {

        case GET_TASKS:
            return {
                ...state,
                projectTasks: action.payload
            }

        case ADD_TASK:
            return {
                ...state,
                projectTasks: [...state.projectTasks, action.payload],
                taskFormError: false
            }

        case TASK_FORM_VALIDATION:
            return {
                ...state,
                taskFormError: true
            }

        case DELETE_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.filter(task => task._id !== action.payload)

            }
        case EDIT_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.map(task => task._id === action.payload._id ? action.payload : task),
                currentTask: null
            }

        case CURRENT_TASK:
            return {
                ...state,
                currentTask: action.payload
            }

        default: return state
    }
}

export default TaskReducer;