import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import AuthScreen from '../screens/AuthScreen';
import DetailsSubtasksScreen from '../screens/DetailsSubtasksScreen';
import HomeScreen from '../screens/HomeScreen';
import StartupScreen from '../screens/StartupScreen';
import TimerScreen from '../screens/TimerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InfoScreen from '../screens/InfoScreen';


const tasksFlow = createStackNavigator(
    {
        Home: HomeScreen,
        DetailsSubtasks: DetailsSubtasksScreen,
        Timer: TimerScreen
    }, {
        navigationOptions: {
            drawerLabel: 'All Tasks', 
            labelStyle: {
                color: '#fff'
            }
        }
    }
);


const ProfileNavigator = createStackNavigator({
    Profile: ProfileScreen
}, {
    navigationOptions: {
        drawerLabel: 'Account',
        labelStyle: {
            color: '#fff'
        }
    }
})


const InfoNavigator = createStackNavigator({
    Info: InfoScreen
}, {
    navigationOptions: {
        drawerLabel: 'Info',
        labelStyle: {
            color: '#fff'
        }
    }
})

// mainFlow.navigationOptions = {
//     tabBarOptions: {
//         // labelStyle: {
//         //     fontFamily: 'open-sans-bold'
//         // },
//         activeTintColor: '#fff'
//     }
// }

const TimerNavigator = createStackNavigator({
    TimerData: TimerScreen
}, {
    navigationOptions: {
        drawerLabel: 'Timer',
        labelStyle: {
            color: '#fff'
        }
    }
})


const mainFlow = createDrawerNavigator({
    tasksList: tasksFlow,
    ProfileOverview:  ProfileNavigator,
    InfoOverview: InfoNavigator,
    TimerOverview: TimerNavigator
}, 
{
    drawerBackgroundColor: '#6e7c7d',
    contentOptions: {
        labelStyle: {
            color: '#fff'
        },
        activeTintColor: '#fff'
    },
    contentComponent: props => {
        return (
            <DrawerItems {...props} />
        );
    },
    initialRouteName: 'TimerOverview'      
});

const mainNav = createSwitchNavigator({
    Projects: mainFlow,
    Auth: AuthScreen,
    Startup: StartupScreen
},
{
    initialRouteName: 'Projects'
})


export default createAppContainer(mainNav);