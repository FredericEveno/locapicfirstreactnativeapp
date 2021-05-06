import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import ChatScreen from './ChatScreen';
import POIScreen from './POIScreen';

import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
import pseudo from './reducers/pseudo';
import poilist from './reducers/poilist';


const store = createStore(combineReducers({pseudo, poilist}));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator screenOptions={ ({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;

        if (route.name === 'Map') {
          iconName = 'map';
        } else if (route.name === 'Chat') {
          iconName = 'chatbubbles';
        } else if (route.name === 'POI') {
          iconName = 'location'
        }

        return <Ionicons name={iconName} size={24} color={color} />;

      }

    })}

      tabBarOptions={{
        activeBackgroundColor: '#130f40',
        inactiveBackgroundColor: '#130f40',
        activeTintColor: '#db5952',
        inactiveTintColor: 'white',
      }}

    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="POI" component={POIScreen} />
    </Tab.Navigator>
  );
 }

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

export default App;
