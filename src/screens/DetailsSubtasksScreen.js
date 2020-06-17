import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

const DetailsSubtasksScreen = ({navigation}) => {

    // const { state, fetchTasks } = useContext(TaskContext);



    return (
        <View style={styles.screen}>
            {/* <NavigationEvents onWillFocus={fetchTasks} />
            <FlatList
                data={state}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('DetailsSubtasks', { id: item.id })
                        }
                    >
                        <ListItem chevron title={item.name} />
                    </TouchableOpacity>
                    );
                }}
            /> */}
        </View>
    );
};

DetailsSubtasksScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'To Do:',
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default DetailsSubtasksScreen;
