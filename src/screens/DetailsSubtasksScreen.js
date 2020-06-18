import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Text, Button, Input, ListItem } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import SubtaskModal from '../components/SubtaskModal';
import ReminderModal from '../components/ReminderModal';
import * as subtaskActions from '../store/actions/subtask';

const DetailsSubtasksScreen = ({navigation}) => {

    const taskId = navigation.getParam('id');
    const selectedTask = useSelector(state => state.tasks.tasks.find(task => task.id === taskId));

    const subtasks = useSelector(state => state.subtasks.subtasks);
    console.log(subtasks);
    const dispatch = useDispatch();
    
    const loadSubtasks = async () => {
        try {
          await dispatch(subtaskActions.fetchSubtasks());
        } catch (err) {
           console.log(err);
        }
    };
  
    useEffect(() => {
        loadSubtasks();
    }, [dispatch]);


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
            <View style={styles.titleContainer}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity
                        // onPress={handleCheckTask}
                    >
                        <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="#589690"/>
                    </TouchableOpacity>
                    <Text style={styles.titleTaskText}>{selectedTask.title}</Text>
                </View>
                <TouchableOpacity
                    // onPress={handleDeleteTask}
                >
                    <MaterialIcons name="edit" size={24} color="#6e7c7d" />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <Input
                    containerStyle={{ height: 48}}
                    placeholder={'Enter description...'}
                />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.subtasksText}>Time Spent:</Text>
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
                        buttonStyle={{backgroundColor: "#589690"}}
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
                        buttonStyle={{backgroundColor: "#589690"}}
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
                        <ListItem checkBox title={item.name} subtitle={item.estimatedTime} />
                    </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

DetailsSubtasksScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'To Do:',
        // headerRight: () => (
        //     <HeaderButtons  
        //       HeaderButtonComponent={HeaderButton}
        //     >
        //        <Item
        //             color='#966658' 
        //             size={32} 
        //             title="Add Task"
        //             iconName={'md-add-circle-outline'}
        //             onPress={() => {
        //                 navData.navigation.setParams({isModalVisible: true})
        //             }}
        //        />
        //     </HeaderButtons>
        // ),
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
        marginBottom: 8
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
    }
});

export default DetailsSubtasksScreen;
