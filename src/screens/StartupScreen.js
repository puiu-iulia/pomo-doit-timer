import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const LoginScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.screen}>
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
            <Button
                disabled={(!password || !email)}
                disabledStyle={{backgroundColor: '#6e7c7d', }}
                titleStyle={{color: 'white', marginRight: '30%'}}
                buttonStyle={{backgroundColor: '#556B2F', width: '100%'}}
                type="outline"
                title={'Login'}
                onPress={() => {props.navigation.navigate('Timer')}}
            />
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

  export default LoginScreen;