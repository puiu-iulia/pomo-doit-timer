import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Modal, TouchableHighlight, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input, Button, Text, CheckBox} from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import * as taskActions from '../store/actions/task';
 
const CustomModal = ({modalVisible, onClose, addItemHandler}) => {

    const [date, setDate] = useState(new Date(1598051730000));

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  

  

    const dispatch = useDispatch()

    // const setReminder = useCallback(async () => {
    //     try {
    //       await dispatch(taskActions.addTask(title, priority, date));
    //     } catch (err) {
    //         console.log(err);
    //     }
    //   })

 
 
    return (
        <View>
                <DateTimePickerModal
                    isVisible={modalVisible}
                    value={date}
                    mode='datetime'
                    onConfirm={onClose}
                    onCancel={onClose}
                />
            {/* )} */}
        </View>
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
