import React, { useEffect } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import * as authActions from '../../src/store/actions/auth';

const StartupScreen = ({navigation}) => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                navigation.navigate('Auth');
            }
            const transformedUserData = JSON.parse(userData);
            const { token, userId, } = transformedUserData;  
            dispatch(authActions.authenticate(userId, token));
            navigation.navigate('Tasks');
            console.log(transformedUserData, userData);   
    
        };
        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.screen}>
         
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    input: {
      width: '80%',
      margin: 16
    }
  });

  export default StartupScreen;