import Task from '../../models/task';

export const CREATE_TASK = 'CREATE_TASK';
export const GET_TASKS = 'GET_TASKS';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const fetchTasks = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch(`https://tasks-timer.firebaseio.com/tasks/${userId}.json`);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedTasks = [];

            for (const key in resData) {
                loadedTasks.push(
                    new Task(
                       key,
                       resData[key].title,
                       resData[key].priority,
                       resData[key].deadline
                    )
                )
            }

            console.log(loadedTasks, 'tasks');
    
            dispatch({ type: GET_TASKS, tasks: loadedTasks });
        } catch (err) {
            this(err);
        }
    }
}

export const addTask = (title, priority, deadline) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://tasks-timer.firebaseio.com/tasks/${userId}.json?auth=${token}`,
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                priority,
                deadline
            })
        });
        const resData = await response.json();
        console.log(resData);

        dispatch({type: CREATE_TASK, taskData: {id: resData.name, title, priority, deadline}})
    }
}