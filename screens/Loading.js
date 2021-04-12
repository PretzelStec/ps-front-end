import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Image 
} from 'react-native';

export function Loading(){
    return (
        <Image style={{height:'100%', width:'100%'}} source={require('../assets/loading-screen.gif')} />
    );
}

const Styles = {
    container: {
        flex: 1,
        backgroundColor: '#D15D5D',
        alignItems: 'center',
        justifyContent: 'center',
      }
}