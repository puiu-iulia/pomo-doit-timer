import Task from '../../models/task';

export const CREATE_TASK = 'CREATE_TASK';
export const GET_TASKS = 'GET_TASKS';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const fetchTasks = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch(`https://tasks-timer.firebaseio.com/tasks.json`);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedTasks = [];

            for (const key in resData) {
                loadedTasks.push(
                    new Task(
                       key,
                       resData[key].userId,
                       resData[key].title,
                       resData[key].priority,
                       resData[key].deadline,
                       resData[key].completed,
                       resData[key].subtasks
                    )
                )
            }

            userTasks = loadedTasks.filter(task => task.userId === userId);

            // console.log(tasks, userTasks, loadedTasks, 'tasks');
    
            dispatch({ type: GET_TASKS, tasks: userTasks });
        } catch (err) {
            this(err);
        }
    }
}

export const addTask = (title, priority, deadline, completed, subtasks) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://tasks-timer.firebaseio.com/tasks.json`,
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                title,
                priority,
                deadline,
                completed,
                subtasks
            })
        });
        const resData = await response.json();
        console.log(resData);

        dispatch({type: CREATE_TASK, taskData: {id: resData.name, userId, title, priority, deadline, completed, subtasks}})
    }
}

export const updateTask = (id, title, priority, deadline, completed, subtasks) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://tasks-timer.firebaseio.com/tasks/${id}.json`,
        {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                priority,
                deadline,
                completed,
                subtasks
            })
        });
        const resData = await response.json();
        // console.log(resData);

        dispatch({type: UPDATE_TASK, pid: id, taskData: {userId, title, priority, deadline, completed, subtasks}})
    }
}

export const deleteTask = id => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;

        const response = await fetch(
            `https://tasks-timer.firebaseio.com/tasks/${id}.json?auth=${token}`,
            {
              method: 'DELETE'
            }
        );
    
        if (!response.ok) {
        throw new Error('Something went wrong!');
        }
        dispatch({ type: DELETE_PRODUCT, pid: id });
    }
}