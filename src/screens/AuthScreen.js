import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Alert} from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { Text, Button, Input } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import * as authActions from '../../src/store/actions/auth';

const AuthScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignin, setIsSignin] = useState(true);
    const [isSignup, setIsSignup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();

    const getUserCredentials = async () => {
      const userCredentials = await AsyncStorage.getItem('userCredentials');
      if (userCredentials) {
        const transformedData = JSON.parse(userCredentials);
        const { usernameData, userPasswordData } = transformedData;
        if (usernameData != '' && userPasswordData != '') {
          setEmail(usernameData);
          setPassword(userPasswordData);
        }            
      }   
    }

    useEffect(() => {
      getUserCredentials();
    }, []);

    useEffect(() => {
        if (error) {
          Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
      }, [error]);

    const authHandler = async () => {
        // let action;
        // if (isSignup) {
        //   action = authActions.signup(
        //     email,
        //     password
        //   );
        // } else {
        //   action = authActions.login(
        //     email,
        //     password
        //   );
        // }
        // setError(null);
        // setIsLoading(true);
        // try {
        //   await dispatch(action);
          props.navigation.navigate('Home');
        // } catch (err) {
        //   setError(err.message);
        //   setIsLoading(false);
        // }
      };

    return (
        <KeyboardAvoidingView style={styles.screen}>
            <View style={styles.input}>
                <Input
                    placeholder="Email"
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
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    leftIcon={
                        <Fontisto name="locked" size={24} color='#6e7c7d' />
                    }
                />
            </View>
            <View style={styles.linksContainer}>
              <TouchableOpacity
                  onPress={() => {
                      setIsSignin(false);
                      setIsSignup(true);
                  }}
              >
                  <Text style={styles.link}>{isSignup? 'Sign In' : 'Sign Up'}</Text>
                  <Text style={styles.link}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
           
            <Button
                disabled={(!password || !email)}
                disabledStyle={{backgroundColor: '#6e7c7d', }}
                titleStyle={{color: 'white'}}
                buttonStyle={{backgroundColor: '#589690'}}
                containerStyle={{width: '80%'}}
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
        justifyContent: 'center',
    },
    input: {
      width: '80%',
      margin: 16
    },
    link: {
        color: '#6e7c7d',
        marginBottom: 24,
        textDecorationLine: 'underline',
        alignSelf: 'flex-end'
    },
    linksContainer: {
      width: '80%',
      marginRight: 16
    }
  });

  export default AuthScreen;