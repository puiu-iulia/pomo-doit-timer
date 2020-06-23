import React, { useState, useEffect, useCallback } from 'react';
import { Text, StyleSheet, View, Dimensions, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
import { Line } from 'react-native-svg';
import { Ionicons, Entypo, Foundation } from '@expo/vector-icons';

import TimerSettingsModal from '../components/TimerSettingsModal';


const TimerScreen = ({navigation}) => {

    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();
    const [workTime, setWorkTime] = useState(25);

    //TODO: UpdateTimerText() 
    // BackgroundTimer()
    
    const getTimePreferences = useCallback(async () => {
        const timePreferences = await AsyncStorage.getItem('timePreferences');
        if (timePreferences) {
            const transformedData = JSON.parse(timePreferences);
            const { storedWorkTime, storedBreakTime, storedWorkSessions, storedLongBreak } = transformedData;
            setWorkTime(storedWorkTime);
            console.log(storedWorkTime);
        }
      
        console.log(workTime);
    });

    useEffect(() => {
        getTimePreferences();
    }, [workTime]);


    useEffect(() => {
        navigation.setParams({timeChanged: false})
    }, [isTimeChanged]);
    const isTimeChanged = navigation.getParam('timeChanged');
  
    useEffect(() => {
        navigation.setParams({isTimerSettingsModalVisible: false});
    }, [isModalVisible]);
    const isModalVisible = navigation.getParam('isTimerSettingsModalVisible');

    return (
        <View style={styles.screen}>
            <TimerSettingsModal
                modalVisible={isModalVisible}
                onClose={() => {
                    navigation.setParams({isTimerSettingsModalVisible: false});
                }}
                onSave={() => {
                    navigation.setParams({timeChanged: true})
                }}
            />
            <View style={styles.circleView}>
                <View 
                    style={styles.circle}
                >
                    <Text style={styles.timerText}>{workTime}:00</Text>
                </View>
            </View>
            <View>
                <Button
                    buttonStyle={{backgroundColor: "#589690"}}
                    containerStyle={styles.buttonContainer}
                    // onPress={onStart}
                    title={'Start'}
                    icon={
                        <Ionicons style={styles.iconButtons} name="ios-play" size={24} color="white" />}
                />
                <Button
                    buttonStyle={{backgroundColor: "#6e7c7d"}}
                    containerStyle={styles.buttonContainer}
                    // onPress={onStart}
                    title={'Stop'}
                    icon={
                        <Foundation style={styles.iconButtons} name="stop" size={24} color="white" />}
                />
                <Button
                    buttonStyle={{backgroundColor: "#6e7c7d"}}
                    containerStyle={styles.buttonContainer}
                    // onPress={onStart}
                    title={'Pause'}
                    icon={
                        <Ionicons style={styles.iconButtons} name="ios-pause" size={24} color="white" />}
                />
                <Button
                    buttonStyle={{backgroundColor: "#6e7c7d"}}
                    containerStyle={styles.buttonContainer}
                    onPress={() => {
                        navigation.setParams({isTimerSettingsModalVisible: true})
                    }}
                    title={'Timer Settings'}
                    icon={
                        <Ionicons style={styles.iconButtons} name="md-stopwatch" size={24} color="white" />}
                />
            </View>
        </View>
    );
};

TimerScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Tasks To Do',
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    circleView: {
        marginVertical: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle: {
        height: 240,
        width: 240,
        borderRadius: 170,
        borderWidth: 16,
        borderColor: '#966658',
    },
    buttonContainer: {
        marginVertical: 8
    },
    iconButtons: {
        marginRight: 8
    },
    timerText: {
        fontSize: 48,
        color: '#966658',
        alignSelf: 'center',
        marginTop: '30%'
    }
});

export default TimerScreen;
