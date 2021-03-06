import { DELETE_SUBTASK, CREATE_SUBTASK, UPDATE_SUBTASK, GET_SUBTASKS } from '../actions/subtask';
import Subtask from '../../models/subtask';

const initialState = {
    allSubtasks: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_SUBTASKS: {
            return { 
                ...state,
                allSubtasks: action.subtasks
            }
        }
        case CREATE_SUBTASK: {
            const newSubtask = new Subtask(
                action.subtaskData.id,
                action.subtaskData.taskId,
                action.subtaskData.title,
                action.subtaskData.estimatedTime
            );
            return {
                ...state,
                subtasks: state.subtasks.concat(newSubtask)
            }
        }
    }
    return state;
}