import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input, Button, Text, CheckBox} from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import * as taskActions from '../store/actions/task';
 
const CustomModal = ({modalVisible, onClose, addItemHandler}) => {

    const [title, setTitle] = useState();
    const [priority, setPriority] = useState(1);
    const [highChecked, setHighChecked] = useState(false);
    const [mediumChecked, setMediumChecked] = useState(false);
    const [lowChecked, setLowChecked] = useState(false);
    const [date, setDate] = useState();

    const dispatch = useDispatch()

    const createTask = useCallback(async () => {
        try {
          await dispatch(taskActions.addTask(title, priority, date));
        } catch (err) {
            console.log(err);
        }
      })

    //ToDo: Refactor with useReducer

    const handleHighCheck = () => {
        setPriority('#966658');
        setHighChecked(true);
        setMediumChecked(false);
        setLowChecked(false);
    }

    const handleMediumCheck = () => {
        setPriority('#589690');
        setHighChecked(false);
        setMediumChecked(true);
        setLowChecked(false);
    }
    
    const handleLowCheck = () => {
        setPriority('#6e7c7d');
        setHighChecked(false);
        setMediumChecked(false);
        setLowChecked(true);
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

            <View style={styles.modalView}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputTitle}
                        placeholder="Project Title"
                        value={title}
                        onChangeText={setTitle}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <Text style={styles.labelText}>Priority: </Text>
                <View style={styles.rowView}>
                    <CheckBox  
                        checked={highChecked}
                        onPress={handleHighCheck} 
                        onIconPress={handleHighCheck} 
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o' 
                        title='High' 
                        uncheckedColor='red'
                        checkedColor='red' />
                    <CheckBox
                        checked={mediumChecked} 
                        onPress={handleMediumCheck}
                        onIconPress={handleMediumCheck}
                        checkedIcon='dot-circle-o' 
                        uncheckedIcon='circle-o' 
                        title='Medium'
                        uncheckedColor='blue'
                        checkedColor='blue' 
                    />
                    <CheckBox
                        checked={lowChecked}
                        onPress={handleLowCheck}
                        onIconPress={handleLowCheck}     
                        checkedIcon='dot-circle-o' 
                        uncheckedIcon='circle-o' 
                        title='Low'
                        checkedColor='#6e7c7d'  
                    />
                </View>
        <Text style={styles.labelText}>Deadline: {(date) ? date: 'Today'}</Text>
                <Calendar
                    onDayPress={(day) => {
                        setDate(day.dateString);
                        console.log(day, date);
                    }}
                />     
                <Button
                    type="outline"
                    containerStyle={styles.saveButton}  
                    title={'Save'}
                    onPress={() => {
                        createTask();
                        onClose();
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
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 8
    },
    modalView: {
        flex: 1,
        margin: 8,
        backgroundColor: "white",
        alignItems: "center",
    },
    modalText: {
        marginLeft: 8,
        textAlign: "center",
        fontSize: 18
    },
    inputContainer: {
        width: '90%',
        borderBottomColor: '#6e7c7d',
        borderBottomWidth: 1,
        marginBottom: 4
    },
    inputTitle: {
        paddingVertical: 0,
        marginVertical: 0,
        fontSize: 18
    },
    labelText: {
        color: '#6e7c7d',
        fontSize: 16
    },
    calendar: {
        height: 100,
        borderWidth: 1,
        borderColor: 'gray',
    },
    saveButton: {
        width: '70%'
    }
});

export default CustomModal;
