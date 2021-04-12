import React, { useEffect } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    AsyncStorage,
    RefreshControl,
    VirtualizedList
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
import Folder from '../shared/folder'

import { PasswordForm } from '../screens/passwordForm';
import { Loading } from '../screens/Loading';

import Encryption from '../component/encyption';
import Axios from 'axios';

const Stack = createStackNavigator();

export function Pass({navigation}) {
    const [data, setData] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true)
    
    let {email, password, token} = React.useContext(AuthContext);

    const getData = () => {
        const config = {
            'authorization': 'Bearer '+ token,
            'accept':'application/json',
            'content-type':'application/json'
        }

        Axios.get('https://password-safe-backend.herokuapp.com/api/password/', {headers:config})
        .then((res) => {
            setData(res.data.passwords)
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
        // <View style={style.container}>
        //     <FlatList style={{width:'100%', minHeight:'100%'}}
        //         data={data} 
        //         renderItem={({item}) => 
        //             <DataCard id={item._id} 
        //                 type="password"
        //                 title={Encryption.decipher(item.title, email+password).toString()} 
        //                 entryEmail={Encryption.decipher(item.email, email+password).toString()} 
        //                 entryPass={Encryption.decipher(item.password, email+password).toString()} 
        //                 url={Encryption.decipher(item.url, email+password).toString()}
        //             />}
        //         keyExtractor={(item) => item._id}
        //         refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getData} />}
        //         ListEmptyComponent={() => <Text style={{color:"#D15D5D", paddingTop:100, alignSelf:'center'}}>--No Passwords Yet--</Text>}
        //     />
        //     <MaterialIcons style={style.add} size={100} name='add-circle' onPress={()=>{navigation.navigate('Add Password')}} />
        // </View>
        <View style={style.container}>
            <View style={{width:'94%'}}>
                <VirtualizedList 
                    contentContainerStyle={{paddingBottom:120}}
                    data={data}
                    renderItem={({item}) => item.section ? <Folder title={item.section} fl_data={item.data} /> 
                    : <DataCard 
                        type="password"
                        title={item.title} 
                        entryEmail={item.email} 
                        entryPass={item.password}
                        section={item.section} 
                        url={item.url}
                        id={item._id}
                    />}
                    keyExtractor ={item => item._id}
                    getItemCount={(data)=>data.length}
                    getItem={(data, index) => (data[index.toString()])}
                    refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getData} />}
                    style={{width:'100%', minHeight:'100%'}}
                />
                <MaterialIcons style={style.add} size={65} name='add-circle' onPress={()=>{navigation.navigate('Add Password')}} />
            </View>
        </View>
    )}

    return(
        <Stack.Navigator screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
            <Stack.Screen name={"pass"} component={screen}
                options={{
                    headerTitle: () => <Header title="Passwords"/>,
                    headerStyle:{backgroundColor: "#D15D5D"}
                }}
            />
            <Stack.Screen name={"Add Password"} component={PasswordForm} 
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
        width: '100%',
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