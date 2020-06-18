import Subtask from '../../models/subtask';

export const CREATE_SUBTASK = 'CREATE_SUBTASK';
export const GET_SUBTASKS = 'GET_SUBTASKS';
export const UPDATE_SUBTASK = 'UPDATE_SUBTASK';
export const DELETE_SUBTASK = 'DELETE_SUBTASK';

export const fetchSubtasks = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://tasks-timer.firebaseio.com/subtasks.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            
           
            const loadedSubtasks = [];

            for (const key in resData) {
                loadedSubtasks.push(
                    new Subtask(
                       key,
                       resData[key].projectId,
                       resData[key].title,
                       resData[key].estimatedTime
                    )
                )
            }

            console.log(loadedSubtasks)
    
            dispatch({ type: GET_SUBTASKS, subtasks: loadedSubtasks });
        } catch (err) {
            this(err);
        }
    }
}

export const addSubtask = (projectId, title, estimatedTime) => {
    return async dispatch => {
        const response = await fetch('https://tasks-timer.firebaseio.com/subtasks.json',
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectId,
                title,
                estimatedTime
            })
        });
        const resData = await response.json();
        console.log(resData);

        dispatch({type: CREATE_SUBTASK, subtaskData: {id: resData.name, projectId, title, estimatedTime}})
    }
}