import React from 'react';
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators, TransitionPresets} from '@react-navigation/stack'

import {Login} from '../screens/login';
import {Register} from '../screens/register';
import {ForgotPassword} from '../screens/forgotPass';
import {About} from '../screens/about';

const AuthStack = createStackNavigator();

export function AuthStackNavigator() {  
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}>
        <AuthStack.Screen name={'About'} component={About} />
        <AuthStack.Screen name={'Login'} component={Login} />
        <AuthStack.Screen name={'Register'} component={Register}/>
        <AuthStack.Screen name={'Forgot'} component={ForgotPassword}/>
    </AuthStack.Navigator>
  );
}