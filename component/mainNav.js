import { NavigationContainer} from '@react-navigation/native';
import { AuthStackNavigator } from '../navigators/AuthStackNavigators';
import { AuthContext } from '../component/AuthContext'

import React, { useEffect, Component } from 'react';
import { AsyncStorage } from 'react-native';

import { Loading } from '../screens/Loading';
import { HomeNav } from '../navigators/HomeNavigation'

export default function MainNav(){

    let {isLoading, token, setIsLoading} = React.useContext(AuthContext);

    useEffect(() => {
        setIsLoading(false)
        // AsyncStorage.getItem('@myToken', (err, res) => {
        //     setToken(res);
        //     setIsLoading(false);
        // })
    }, [])
    
    return(
        <NavigationContainer>
            {isLoading ? (<Loading />) : !token ? 
            (
            <AuthStackNavigator />
            ) 
            : (
            <HomeNav/>
            )}
        </NavigationContainer>
    )
}