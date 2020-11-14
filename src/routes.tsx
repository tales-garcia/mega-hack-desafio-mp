import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './pages/Main';

const { Navigator, Screen } = createStackNavigator();

export default function Routes () {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#f2f3f5'
                }
            }}>
                <Screen name="main" component={Main} />
                
            </Navigator>
        </NavigationContainer>
    );
};