import createDataContext from './createDataContext';

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_tasks':
      return action.payload;
    default:
      return state;
  }
};

const fetchTasks = dispatch => async () => {
    try {
        const response = await fetch('https://pomodoit-a20ed.firebaseio.com/tasks.json');
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({ type: 'fetch_tasks', payload: response.data });
    } catch (err) {
        this(err);
    }
  
  
};
const createTask = dispatch => async (title, description, estimatedTime, priority, deadline) => {

    await fetch('https://pomodoit-a20ed.firebaseio.com/tasks.json',
    {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description,
            estimatedTime,
            priority,
            deadline
        })
    });
};

export const { Provider, Context } = createDataContext(
  taskReducer,
  { fetchTasks, createTask },
  []
);

