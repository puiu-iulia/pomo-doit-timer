import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
import { Line } from 'react-native-svg';
import { Ionicons, Entypo, Foundation } from '@expo/vector-icons';

import TimerSettingsModal from '../components/TimerSettingsModal';


const TimerScreen = ({navigation}) => {

    const [fill, setFill] = useState(0);


    console.log(isModalVisible)
    useEffect(() => {
        navigation.setParams({isTimerSettingsModalVisible: false});
    }, []);
    const isModalVisible = navigation.getParam('isTimerSettingsModalVisible');

    return (
        <View style={styles.screen}>
            <TimerSettingsModal
                isModalVisible={isModalVisible}
                onClose={() => {
                    navigation.setParams({isTimerSettingsModalVisible: false});
                }}
            />
            <View style={styles.circleView}>
                <View 
                    style={styles.circle}
                >
                    <Text style={styles.timerText}>25:00</Text>
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
