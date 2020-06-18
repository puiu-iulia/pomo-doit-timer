import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input, Button, Text, CheckBox} from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import * as subtaskActions from '../store/actions/subtask';
 
const SubtaskModal = ({subtaskModalVisible, onCloseSubtask, taskId}) => {

    // console.log(subtaskModalVisible)

    const [title, setTitle] = useState();
    const [estimatedTime, setEstimatedTime] = useState();

    const dispatch = useDispatch()

    const createSubtask = useCallback(async () => {
        try {
          await dispatch(subtaskActions.addSubtask(taskId, title, estimatedTime));
        } catch (err) {
            console.log(err);
        }
      })
 
    return (
        <Modal
            animationType="fade"
            visible={subtaskModalVisible}
        >
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onCloseSubtask}
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
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputTitle}
                        placeholder="Estimated Time in Minutes"
                        value={estimatedTime}
                        onChangeText={setEstimatedTime}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <Button
                    type="outline"
                    containerStyle={styles.saveButton}  
                    title={'Save'}
                    onPress={() => {
                        createSubtask();
                        onCloseSubtask();
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

export default SubtaskModal;
