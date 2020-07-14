import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Text, Button, Input, ListItem } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import SubtaskModal from '../components/SubtaskModal';
import ReminderModal from '../components/ReminderModal';
import * as subtaskActions from '../store/actions/subtask';
import * as taskActions from '../store/actions/task';


const DetailsSubtasksScreen = ({navigation}) => {

    const [title, setTitle] = useState();
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    const taskId = navigation.getParam('id');
    const selectedTask = useSelector(state => state.tasks.tasks.find(task => task.id === taskId));

    const loadedSubtasks = useSelector(state => state.subtasks.allSubtasks);
    const subtasks = loadedSubtasks.filter(subtask => subtask.projectId === taskId);
    const dispatch = useDispatch();
    
    const loadSubtasks = async () => {
        try {
          await dispatch(subtaskActions.fetchSubtasks());
        } catch (err) {
           console.log(err);
        }
    }; 

    const handleCheckTask = async () => {
        try {
            await dispatch(taskActions.updateTask(taskId, selectedTask.title, selectedTask.priority, selectedTask.deadline, true, selectedTask.subtasks));
        } catch (err) {
            console.log(err);
        }
        navigation.navigate('Tasks');
    };

    const handleEditTask = async () => {
        try {
            await dispatch(taskActions.updateTask(taskId, title, selectedTask.priority, selectedTask.deadline, selectedTask.completed, selectedTask.subtasks));
        } catch (err) {
            console.log(err);
        }
        setIsEditingTitle(false);
    }
  
    useEffect(() => {
        loadSubtasks();
    }, [loadSubtasks]);


    useEffect(() => {
        navigation.setParams({isSubtaskModalVisible: false});
        navigation.setParams({isReminderModalVisible: false});
    }, []);
    const isSubtaskModalVisible = navigation.getParam('isSubtaskModalVisible');
    const isReminderModalVisible = navigation.getParam('isReminderModalVisible');
    
    return (
        <View style={styles.screen}>
            <NavigationEvents onWillFocus={loadSubtasks} />
            <ReminderModal
                modalVisible={isReminderModalVisible}
                onClose={() => {
                    navigation.setParams({isReminderModalVisible: false})
                }}
             />
            <SubtaskModal
                taskId={taskId}
                onCloseSubtask={() => 
                    navigation.setParams({isSubtaskModalVisible: false})
                }
                subtaskModalVisible={isSubtaskModalVisible} 
            />
            
            {/* <View style={styles.titleContainer}> */}
                {
                    !isEditingTitle ? (
                        <View style={styles.titleContainer}>
                            <View style={styles.titleContainer}>
                                <TouchableOpacity
                                    onPress={handleCheckTask}
                                >
                                    <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="#589690"/>
                                </TouchableOpacity>
                                <Text style={styles.titleTaskText}>{selectedTask.title ? selectedTask.title : ''}</Text>
                            </View>
                            <TouchableOpacity
                                
                                onPress={() => setIsEditingTitle(true)}
                            >
                                <MaterialIcons name="edit" size={24} color="#6e7c7d" />
                            </TouchableOpacity>
                        </View>
                        
                    ) : (
                        <View style={styles.container}>
                            <Input
                                inputContainerStyle={{margin: 0}}
                                value={title}
                                placeholder={selectedTask.title}
                                onChangeText={setTitle}
                                onEndEditing={handleEditTask}
                                rightIcon={{type: 'feather', name: 'save', onPress: handleEditTask, color: "#6e7c7d"}}
                            />
                        </View>
                    )
                }
                      
            {/* </View> */}
            <View style={styles.titleContainer}>
                <Text style={styles.subtasksText}>Tracked Time:</Text>
                <TouchableOpacity     
                    style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            navigation.navigate('Timer')
                        }}
                        titleStyle={{color: '#fff'}}
                        buttonStyle={{backgroundColor: "#589690"}}
                        title={'Start Timer'}
                        icon={
                            <Ionicons name="ios-timer" size={24} color="white" style={{marginHorizontal: 8}} />}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.subtasksText}>Due Date: {selectedTask.deadline}</Text>
                <TouchableOpacity
                    style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            navigation.setParams({isReminderModalVisible: true})
                        }}
                        titleStyle={{color: '#fff'}}
                        buttonStyle={{backgroundColor: '#6e7c7d'}}
                        title={'Set Reminder'}
                        icon={
                            <Ionicons name="ios-calendar" size={24} color="white" style={{marginHorizontal: 8}} />}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.subtasksText}>Subtasks:</Text>
                <TouchableOpacity 
                    style={styles.buttonContainer}
                >
                    <Button
                         onPress={() => {
                            navigation.setParams({isSubtaskModalVisible: true});
                            console.log(isSubtaskModalVisible);
                        }}
                        titleStyle={{color: '#fff'}}
                        buttonStyle={{backgroundColor: "#6e7c7d"}}
                        title={'Add Subtask'}
                        icon={
                            <Ionicons name="ios-add-circle" size={24} color="#fff" style={{marginHorizontal: 8}}/>}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={subtasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Timer', { id: item.id })
                        }
                    >
                        <View style={{flex: 1, width: '100%', borderBottomColor: '#6e7c7d', borderBottomWidth: 0.5}}>
                            <ListItem 
                                leftIcon={{ name: 'check-box-outline-blank', type: 'materialicons', color: "#589690"}}
                                title={item.title} 
                                subtitle={'Estimated time: ' + item.estimatedTime + ' min'} />
                        </View>
                    </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

DetailsSubtasksScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'To Do:'
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    titleContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        marginTop: 8
    },
    container: {
        backgroundColor: '#fff',
        marginTop: 8
    },
    titleTaskText: {
        fontSize: 18,
        color: '#6e7c7d',
        marginLeft: 8
    },
    buttonContainer: {
        width: '37%'
    },
    subtasksText: {
        fontSize: 16,
        color: '#6e7c7d',
        paddingLeft: 4,
        alignSelf: 'center'
    },
    editButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default DetailsSubtasksScreen;
