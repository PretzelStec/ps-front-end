import React, { useEffect } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    AsyncStorage,
    RefreshControl
} from 'react-native';

import { 
    createStackNavigator,  
    TransitionPresets
} from '@react-navigation/stack';

import { FlatList } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../component/AuthContext';

import { DataCard } from '../shared/dataCard'
import { Header } from '../shared/header';

import { NetworkForm } from '../screens/networkForm';
import { Loading } from '../screens/Loading';

import Encryption from '../component/encyption';
import Axios from 'axios';

const Stack = createStackNavigator();

export function Network({navigation}) {
    const [data, setData] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true)
    
    let {email, password, token} = React.useContext(AuthContext);

    const getData = () => {        
        const config = {
            'authorization': 'Bearer '+ token,
            'accept':'application/json',
            'content-type':'application/json'
        }

        Axios.get('https://password-safe-backend.herokuapp.com/api/network/', {headers:config})
        .then((res) => {
            setData(res.data.networks)
            setIsLoading(false)
        })
        .catch(err => {
            setIsLoading(false)
            setData([{title:'Error Loading Data'}])
        })
    }

    useEffect(() => {
        getData()
    }, [])

    //setIsLoading(true);

    const screen = () =>{ return isLoading ? (<Loading />) : ( 
        <View style={style.container}>
            <FlatList style={{width:'100%', minHeight:'100%'}}
                data={data} 
                renderItem={({item}) => 
                    <DataCard id={item._id} 
                        type='network'
                        title={Encryption.decipher(item.title, email+password).toString()} 
                        email={Encryption.decipher(item.ssid, email+password).toString()} 
                        password={Encryption.decipher(item.password, email+password).toString()} 
                    />}
                keyExtractor={(item) => item._id}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getData} />}
                ListEmptyComponent={() => <Text style={{color:"#D15D5D", paddingTop:100, alignSelf:'center'}}>--No Networks Yet--</Text>}
            />
            <MaterialIcons style={style.add} size={100} name='add-circle' onPress={()=>{navigation.navigate('Add Network')}} />
        </View>
    )}

    return(
        <Stack.Navigator screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
            <Stack.Screen name={"pass"} component={screen}
                options={{
                    headerTitle: () => <Header title="Networks"/>,
                    headerStyle:{backgroundColor: "#D15D5D"}
                }}
            />
            <Stack.Screen name={"Add Network"} component={NetworkForm} 
                options={{
                    headerStyle:{backgroundColor: "#D15D5D"}
                }}
            />
        </Stack.Navigator>
    )
}

const style = StyleSheet.create({
    add:{
        color:"#D15D5D",
        position: 'absolute',
        justifyContent:'center',
        alignItems:'center',
        right: 35,
        bottom: 35,
    },
    container: {
        flex: 1,
        backgroundColor: '#404040',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    submit: {
        backgroundColor:"#D15D5D",
        height: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0
    },
})