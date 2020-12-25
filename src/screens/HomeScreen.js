import React, { useContext,  useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, Icon } from 'react-native-elements';
import { FloatingAction } from "react-native-floating-action";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import HeaderButton from '../components/HeaderButton';
import TaskItem from '../components/TaskItem';
import TaskModal from '../components/TaskModal';
import * as taskActions from '../store/actions/task';
import HomeTabView from '../components/HomeTabView';

const HomeScreen = ({navigation}) => {
    const userTasks = useSelector(state => state.tasks.tasks);
    const tasks = userTasks.filter(task => task.completed === false);
    const dispatch = useDispatch();

    const actions = [
      {
        text: 'Add Project',
        icon: <AntDesign name="addfolder" size={24} color="white" />,
        name: 'bt_project',
        position: 3,
        color: "#589690",
        textBackground: "#589690",
        textColor: 'white'
      },
      {
        text: 'One-time Reminder',
        icon: <Icon type='material-community' name='reminder' size={24} color='white' />,
        name: 'bt_reminder',
        position: 1,
        color: "#589690",
        textBackground: "#589690",
        textColor: 'white'
      },
      {
        text: 'Build a Habit',
        icon: <FontAwesome name="calendar-check-o" size={24} color="white" />,
        name: 'bt_habit',
        position: 2,
        color: "#589690",
        textBackground: "#589690",
        textColor: 'white'
      },
    ];

    useEffect(() => {
        navigation.setParams({isModalVisible: false});
      }, []);
    const isModalVisible = navigation.getParam('isModalVisible');

    return (
        <View style={styles.screen}>
         
{/*            
            <TaskModal
              onClose={() => {
                navigation.setParams({isModalVisible: false});
              }}
              modalVisible={isModalVisible} 
            /> */}
            <HomeTabView 
              navigation={navigation}
            />
            <FlatList
                data={[]}
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
             <FloatingAction
              position='right'
              actions={actions}
              color="#589690"
              onPressItem={name => {
                console.log(`selected button: ${name}`);
              }}
              onPressMain={() => console.log('pressed')}
            />
        </View>
    );
};

HomeScreen.navigationOptions = (navData) => {
    const Logo = <Text style={{fontSize: 24, color: '#966658', textAlign: 'center'}}>Do It Timer</Text>
    return {
        
        // headerTitle: Logo,
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
          
        )
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

export default HomeScreen;
