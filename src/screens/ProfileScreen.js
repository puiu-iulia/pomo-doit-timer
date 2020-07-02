import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';

const ProfileScreen = ({navigation}) => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authActions.logout);
    }

    return (
        <View style={styles.screen}>
            <Button
                title={'Logout'}
                onPress={handleLogout}
            />
        </View>
    );
};

ProfileScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Tasks To Do',
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProfileScreen;
