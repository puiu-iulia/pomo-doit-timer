import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Alert } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import * as authActions from '../../src/store/actions/auth';

const AuthScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignin, setIsSignin] = useState(false);
    const [isSignup, setIsSignup] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
          Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
      }, [error]);

    const authHandler = async () => {
        let action;
        if (isSignup) {
          action = authActions.signup(
            email,
            password
          );
        } else {
          action = authActions.login(
            email,
            password
          );
        }
        setError(null);
        setIsLoading(true);
        try {
          await dispatch(action);
          props.navigation.navigate('Tasks');
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }
      };

    return (
        <KeyboardAvoidingView style={styles.screen}>
            <View style={styles.input}>
                <Input
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                    leftIcon={
                        <AntDesign name="mail" size={24} color='#6e7c7d' />
                    }
                />
            </View>
            <View style={styles.input}>
                <Input
                    secureTextEntry
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    leftIcon={
                        <Fontisto name="locked" size={24} color='#6e7c7d' />
                    }
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    setIsSignin(true);
                    setIsSignup(false);
                }}
            >
                <Text style={styles.link}>{isSignup? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}</Text>
            </TouchableOpacity>
            <Button
                disabled={(!password || !email)}
                disabledStyle={{backgroundColor: '#6e7c7d', }}
                titleStyle={{color: 'white', marginRight: '30%'}}
                buttonStyle={{backgroundColor: '#589690', width: '100%'}}
                type="outline"
                title={isSignup ? 'Sign Up': 'Login'}
                onPress={authHandler}
            />
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
      width: '80%',
      margin: 16
    },
    link: {
        color: '#6e7c7d',
        marginBottom: 24
    }
  });

  export default AuthScreen;