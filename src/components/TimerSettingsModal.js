import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Modal, Slider, TouchableOpacity, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input, Button, Text, CheckBox} from 'react-native-elements';
// import Slider from '@react-native-community/slider';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import * as subtaskActions from '../store/actions/subtask';
 
const TimerSettingsModal = ({modalVisible, onClose, onSave}) => {

    const [workTime, setWorkTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);
    const [workSessions, setWorkSessions] = useState(4);
    const [longBreak, setLongBreak] = useState(20);

    const dispatch = useDispatch();

    // const updateTimePreferences = async () => {
    //     const storedWorkTime =  await AsyncStorage.getItem('workTime');
    //     const storedBreakTime = await AsyncStorage.getItem('breakTime');
    //     const storedWorkSessions = await AsyncStorage.getItem('')
    //   }
    // }

    const updateTimePreferences = (workTime, breakTime, workSessions, longBreak) => {
        AsyncStorage.setItem(
            'timePreferences',
            JSON.stringify({
                workTime: workTime,
                breakTime: breakTime,
                workSessions: workSessions,
                longBreak: longBreak
            })
        )
    }
 
    return (
        <Modal
            animationType="fade"
            visible={modalVisible}
        >
             <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                >
                    <Ionicons name="ios-close-circle" size={24} color="black" />
            </TouchableOpacity>
            <View>
                <View>
    <Text style={styles.textStyle}>Work Time: {workTime} min</Text>
                    <View style={styles.numbersContainer}>
                        <Text>1</Text>
                        <Text>110</Text>
                    </View>
                    <Slider
                        style={{width: '90%', height: 48, marginLeft: 16}}
                        minimumValue={1}
                        maximumValue={110}
                        value={workTime}
                        minimumTrackTintColor="#000"
                        maximumTrackTintColor="#000"
                        onValueChange={(workTime) => {
                            setWorkTime(Math.trunc(workTime))
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.textStyle}>Break Time: {breakTime} min</Text>
                    <View style={styles.numbersContainer}>
                        <Text>1</Text>
                        <Text>20</Text>
                    </View>
                    <Slider
                        style={{width: '90%', height: 48, marginLeft: 16}}
                        minimumValue={1}
                        maximumValue={20}
                        value={breakTime}
                        minimumTrackTintColor="#000"
                        maximumTrackTintColor="#000000"
                        onValueChange={(breakTime) => {
                            setBreakTime(Math.trunc(breakTime))
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.textStyle}>Number of Work Sessions: {workSessions}</Text>
                    <View style={styles.numbersContainer}>
                        <Text>1</Text>
                        <Text>4</Text>
                    </View>
                    <Slider
                        style={{width: '90%', height: 48, marginLeft: 16}}
                        minimumValue={1}
                        maximumValue={4}
                        value={workSessions}
                        onValueChange={(workSessions) => {
                            setWorkSessions(Math.trunc(workSessions));
                        }}
                        minimumTrackTintColor="#000"
                        maximumTrackTintColor="#000000"
                    />
                </View>
                <View>
                    <Text style={styles.textStyle}>Long Break: {longBreak}</Text>
                    <View style={styles.numbersContainer}>
                        <Text>1</Text>
                        <Text>30</Text>
                    </View>
                    <Slider
                        style={{width: '90%', height: 48, marginLeft: 16}}
                        minimumValue={1}
                        maximumValue={30}
                        minimumTrackTintColor="#000"
                        maximumTrackTintColor="#000000"
                        value={longBreak}
                        onValueChange={(longBreak) => {
                            setLongBreak(Math.trunc(longBreak))
                        }}
                    />
                </View>
                <Button
                    buttonStyle={{backgroundColor: "#589690"}}
                    containerStyle={styles.saveButton}  
                    title={'Save'}
                    onPress={() => {
                        updateTimePreferences(workTime, breakTime, workSessions, longBreak);
                        onClose();
                        onSave();
                    }}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    closeButton: {
        height: 24,
        width: 24,
        alignSelf: 'flex-end'
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center'
    },
    saveButton: {
        width: '70%',
        marginTop: '20%',
        alignSelf:'center'
    },
    numbersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    }
});

export default TimerSettingsModal;
