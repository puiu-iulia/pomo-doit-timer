import { DELETE_TASK, CREATE_TASK, UPDATE_TASK, GET_TASKS } from '../actions/task';
import Task from '../../models/task';

const initialState = {
    tasks: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TASKS: {
            return { ...state, tasks: action.tasks}
        }
        case CREATE_TASK: {
            const newTask = new Task(
                action.taskData.id,
                action.taskData.title,
                action.taskData.priority,
                action.taskData.deadline,
                action.taskData.completed,
                action.taskData.subtasks
            );
            return {
                ...state,
                tasks: state.tasks.concat(newTask)
            }
        }
        case UPDATE_TASK: {
            const taskIndex = state.tasks.findIndex(
                task => task.id === action.pid
            );
            const updatedTask = new Task(
                action.pid,
                action.taskData.title,
                action.taskData.priority,
                action.taskData.deadline,
                action.taskData.completed,
                action.taskData.subtasks
            );
            const updatedTasks = [...state.tasks];
            updatedTasks[taskIndex] = updatedTask;
            return {
                ...state,
                tasks: updatedTasks
            };
        }
        case DELETE_TASK: 
            return {
                ...state,
                tasks: state.tasks.filter(
                    task => task.id !== action.pid
                )
            };
    }
    return state;
}