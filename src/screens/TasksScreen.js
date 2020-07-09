import React, { useContext,  useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem } from 'react-native-elements';

import HeaderButton from '../components/HeaderButton';
import TaskItem from '../components/TaskItem';
import TaskModal from '../components/TaskModal';
import * as taskActions from '../store/actions/task';

const TasksScreen = ({navigation}) => {
    const tasks = useSelector(state => state.tasks.tasks);
    console.log(tasks);
    const dispatch = useDispatch();

    const loadTasks = async () => {
      try {
        await dispatch(taskActions.fetchTasks());
      } catch (err) {
         console.log(err);
      }
    };

    useEffect(() => {
      // const willFocusSub = navigation.addListener(
      //   'willFocus',
      //   loadTasks
      // );
      loadTasks();
      // return () => {
      //   willFocusSub.remove();
      // };
    }, [dispatch]);

    
    // console.log(isModalVisible)
    useEffect(() => {
        navigation.setParams({isModalVisible: false});
      }, []);
    const isModalVisible = navigation.getParam('isModalVisible');

    // if (tasks.length === 0) {
    //   return (
    //     <View style={styles.centeredView}>
    //       <Text style={styles.centeredText}>You have no tasks to complete at the moment. Tap the + above to create a new project.</Text>
    //     </View>
    //   )
    // }

    return (
        <View style={styles.screen}>
            <TaskModal
              onClose={() => {
                navigation.setParams({isModalVisible: false});
              }}
              modalVisible={isModalVisible} 
            />
            {/* <NavigationEvents onWillFocus={fetchTasks} /> */}
            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('DetailsSubtasks', { id: item.id })
                        }
                    >
                        <View style={{flex: 1, width: '100%', borderBottomColor: '#6e7c7d', borderBottomWidth: 1}}>
                          <ListItem
                            titleStyle={{fontSize: 20}}
                            leftIcon={{ name: 'check', color: item.priority}}
                            title={item.title}
                            subtitle={item.deadline} 
                            chevron
                          />
                        </View>
                    </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

TasksScreen.navigationOptions = (navData) => {
    const Logo = <Text style={{fontSize: 24, color: '#966658', textAlign: 'center'}}>Do It Timer</Text>
    return {
        
        headerTitle: Logo,
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                color='#6e7c7d'
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          
        ),
        headerRight: () => (
            <HeaderButtons
              
              HeaderButtonComponent={HeaderButton}
            >
               <Item
                 color='#966658' 
                size={32} 
                 title="Add Task"
                 iconName={'md-add-circle-outline'}
                 onPress={() => {
                    navData.navigation.setParams({isModalVisible: true})
                }}
               />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    centeredView: {
      alignItems: "center",
      margin: 16
    },
    centeredText: {
      textAlign:'center'
    }
});

export default TasksScreen;
