import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements';

const TaskItem = props => {
  return (
    <ListItem
        title={"item.name"} 
        chevron
    />
  );
};

export default TaskItem;
