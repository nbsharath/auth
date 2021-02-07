import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChatScreen from './chatScreen';
import ListScreen from './ListScreen';

function HomeScreen() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={ListScreen} />
      <Stack.Screen name="chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

export default HomeScreen;
