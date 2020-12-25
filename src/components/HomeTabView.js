import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { ListItem } from 'react-native-elements';

const HomeTabView = ({navigation}) => {

    const initialLayout = { width: Dimensions.get('window').width };
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'projects', title: 'Projects'},
        { key: 'reminders', title: 'Reminders'},
        { key: 'habits', title: 'Habits'}
    ]
    );

    const ProjectsList = () => (
        <FlatList
            data={[{
                id: '1',
            title: 'Project Title',
            deadline: '13th January 2021' }]}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
            return (
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('DetailsSubtasks', { id: item.id })
                    }
                >
                    <View style={{flex: 1, width: '100%', borderBottomColor: '#6e7c7d', borderBottomWidth: 1}}>
                    {/* <ListItem>
                        <ListItem.Content>
                            <ListItem.Title>{item.title}</ListItem.Title>
                            <ListItem.Subtitle>{'Finish time: ' + item.deadline}</ListItem.Subtitle>
                            <ListItem.Subtitle>{'Tasks: 3/5 Completed'}</ListItem.Subtitle>
                            <ListItem.Subtitle>{'Time Spent on Project: 3h 30min'}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem> */}
                    <ListItem
                        titleStyle={{fontSize: 19, color: '#353535', marginBottom: 8}}
                        subtitleStyle={{fontSize: 14, color: '#757575', lineHeight: 20}}
                        leftIcon={{ name: 'check', color: item.priority}}
                        title={item.title}
                        subtitle={'Finish time: ' + item.deadline + '\nTasks: 3/5 Completed' + '\nTime Spent on Project: 3h 30min'} 
                        chevron
                    />
                    </View>
                </TouchableOpacity>
                );
            }}
        />
    );

    const RemindersList = () => (
        <View 
            style={{height: 100, backgroundColor: '#505050'}}
        />
    );

    const HabitsList = () => (
        <View 
            style={{height: 100, backgroundColor: '#303030'}}
        />
    );


    const renderScene = SceneMap({
        projects: ProjectsList,
        reminders: RemindersList,
        habits: HabitsList
    });

    const renderTabBar = props => (
        <TabBar
          {...props}
          activeColor={'#000'}
          indicatorStyle={styles.indicator}
          style={styles.tabContainer}
          renderLabel={({ route, focused, color }) => (
            <Text style={focused ? styles.tabBarLabelFocused : styles.tabBarLabel}>
              {route.title}
            </Text>
          )}
        />
    );

    return (
        <TabView 
            navigationState= {{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
        />
    )

}

const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: '#fff',
        borderTopColor: '#589690',
        borderTopWidth: 2
    },
    indicator: {
        backgroundColor: '#589690'
    },
    tabBarLabel: {
        color: '#505050', 
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: '500'
    },
    tabBarLabelFocused: { 
        color: '#000', 
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: '600'
    },
    overlay: {
        height: '100%',
        width: Dimensions.get('window').width
    },
    closeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 4
    }
});

export default HomeTabView;