import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './pages/Main';
import ScanQRCode from './pages/ScanQRCode';
import { Dimensions } from 'react-native';
import ConfirmPayement from './pages/ConfirmPayement';
import PaymentSucceed from './pages/PaymentSucceed';

const { Navigator, Screen } = createStackNavigator();

export default function Routes () {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#f2f3f5',
                    height: Dimensions.get('window').height
                }
            }}>
                <Screen name="main" component={Main} />
                <Screen name="scan" component={ScanQRCode} />
                <Screen name="confirm" component={ConfirmPayement} />
                <Screen name="success" component={PaymentSucceed} />
            </Navigator>
        </NavigationContainer>
    );
};