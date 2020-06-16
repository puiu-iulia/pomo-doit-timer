import React, { useContext,  useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Modal, Text, TouchableHighlight } from 'react-native';
import { Context as TaskContext } from '../context/TaskContext';
import { NavigationEvents } from 'react-navigation';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import TaskItem from '../components/TaskItem';
import CustomModal from '../components/CustomModal';
import { TextInput } from 'react-native-gesture-handler';

const TasksScreen = ({navigation}) => {

    // const { state } = useContext(TaskContext);

    const isModalVisible = navigation.getParam('isModalVisible')
    useEffect(() => {
        navigation.setParams({isModalVisible: false});
      }, []);

    if (!isModalVisible) {
      return (
        <View style={styles.centeredView}>
          <Text style={styles.centeredText}>You have no tasks to complete at the moment. Tap the + above to create a new project.</Text>
        </View>
      )
    }

    return (
        <View style={styles.centeredView}>
            <CustomModal
              onClose={() => {
                navigation.setParams({isModalVisible: false});
              }}
              // addItemHandler={createTask} 
              modalVisible={isModalVisible} 
            />
            {/* <NavigationEvents onWillFocus={fetchTasks} /> */}
            <FlatList
                // data={state}
                // keyExtractor={item => item._id}
                renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        // onPress={() =>
                        //     navigation.navigate('DetailsSubtasks', { id: item.id })
                        // }
                    >
                        <TaskItem />
                    </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

TasksScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'To Do;',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                color='000'
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
                 color='000' 
                //  style={styles.cart} 
                 title="Cart"
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 16
      },
      centeredText: {
        textAlign:'center'
      }
});

export default TasksScreen;
