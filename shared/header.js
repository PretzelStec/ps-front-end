import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



export function Header({title}) {

    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <MaterialIcons style={styles.menuicon} size={30} name='menu'  onPress={() => {navigation.openDrawer()}}/>

            <View>
                <Text style={styles.headerText}> {title} </Text>
            </View>

            {/* <MaterialIcons style={styles.keyicon} size={30} name='search'  onPress={() => {}}/> */}
            {/* <MaterialIcons styke={styles.searchicon} size={30} name='search' /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginLeft: 0,
        paddingRight: 0,
        backgroundColor: "#D15D5D",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 20,
        color: '#404040'
    },
    menuicon: {
        position: 'absolute',
        left: 16,
        color: '#404040'
    },
    keyicon: {
        position: 'absolute',
        right: 16,
        color: '#404040'
    },
    searchicon: {
        
    }
});