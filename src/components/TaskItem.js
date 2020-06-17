import React from 'react';
import {View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements';

const TaskItem = ({ title, priority, deadline}) => {
  return (
    <View style={{flex: 1, width: '100%'}}>
      <ListItem
        title={title}
        subtitle={deadline} 
        chevron
        bottomDivider
      />
    </View>
    
  );
};

export default TaskItem;
