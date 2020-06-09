import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TasksScreen = props => {

    return (
        <View style={styles.screen}><Text>TasksScreen</Text></View>
    );
};

TasksScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Task To Do',
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default TasksScreen;
