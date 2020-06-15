import React, { useContext,  useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Modal, Text, TouchableHighlight } from 'react-native';
import { Context as TaskContext } from '../context/TaskContext';
import { NavigationEvents } from 'react-navigation';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import TaskItem from '../components/TaskItem';

const TasksScreen = ({navigation}) => {

    // const { state, fetchTasks } = useContext(TaskContext);
    // const [isModalVisible, setIsModalVisible] = useState(false);
    const isModalVisible = navigation.getParam('isModalVisible')
    useEffect(() => {
        navigation.setParams({isModalVisible: false});
      }, []);

    return (
        <View style={styles.screen}>
              <Modal
                    animationType="fade"
                    visible={isModalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>

                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => {
                            navigation.setParams({isModalVisible: false});
                        }}
                        >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                    </View>
                </Modal>
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
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});

export default TasksScreen;
