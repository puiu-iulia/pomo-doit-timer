import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import MainNavigator from './src/navigation/MainNavigator';
// import { Provider as TaskProvider } from './src/context/TaskContext';
import taskReducer from './src/store/reducers/task';
import subtaskReducer from './src/store/reducers/subtask';
import authReducer from './src/store/reducers/auth';
import { auth } from 'firebase';

const mainReducer = combineReducers({
  tasks: taskReducer,
  subtasks: subtaskReducer,
  auth: authReducer
})

const store = createStore(mainReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
         <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
