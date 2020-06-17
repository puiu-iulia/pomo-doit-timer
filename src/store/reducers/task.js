import { DELETE_TASK, CREATE_TASK, UPDATE_TASK, GET_TASKS } from '../actions/task';
import Task from '../../models/task';

const initialState = {
    tasks: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TASKS: {
            return { tasks: action.tasks}
        }
        case CREATE_TASK: {
            const newTask = new Task(
                action.taskData.id,
                action.taskData.title,
                action.taskData.priority,
                action.taskData.deadline
            );
            return {
                ...state,
                tasks: state.tasks.concat(newTask)
            }
        }
    }
    return state;
}