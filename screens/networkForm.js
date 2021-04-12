import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Image,
    AsyncStorage,
    ScrollView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Axios from 'axios';
import Encryption from '../component/encyption';
import { useEffect } from 'react/cjs/react.development';

import { AuthContext } from '../component/AuthContext'

export function NetworkForm(){
    
    let {email, password, token} = React.useContext(AuthContext);
    let key = email+password
    const [title, setTitle] = React.useState(null)
    const [ssid, setSsid] = React.useState(null)
    const [passwordentry, setPassword] = React.useState(null)
    const [success, setSuccess] = React.useState(0)

    const submit = async () => {
        
        const config = {
            'authorization': 'Bearer ' + token,
            'accept':'application/json',
            'content-type':'application/json'
        }
        Axios.post('https://password-safe-backend.herokuapp.com/api/network/',
        {title:Encryption.cipher(title, key),ssid:Encryption.cipher(ssid, key), password:Encryption.cipher(passwordentry, key)}, 
        {headers:config}
        )
        .then(resp => {
            setSuccess(1)
        })
        .catch(err => {
            console.log(err)
            setSuccess(2)
        })
    }

    return (
        <ScrollView style={style.body}>
            <View style={style.container}>
                <Text style={style.title}>New Network</Text>
                <View style={style.FormContainer}>
                    <Text style={style.labels}>Title</Text>
                    <TextInput style={style.inputs} onChangeText={(text)=>{setTitle(text)}} />
                    <Text style={style.labels}>SSID</Text>
                    <TextInput style={style.inputs} onChangeText={(text)=>{setSsid(text)}} />
                    <Text style={style.labels}>Password</Text>
                    <TextInput style={style.inputs} onChangeText={(text)=>{setPassword(text)}} />
                </View>
                <MaterialIcons style={style.add} size={100} onPress={()=>{submit()}}  
                name={ success === 0 ? 'add-circle' : ( success === 1 ? "check-circle" : "error") } 
                />
                {/* <TouchableOpacity style={style.submit} onPress={() => console.log('submitting')}>
                    <Text style={{textAlign:'center'}}>Submit</Text>
                </TouchableOpacity> */}
            </View>
        </ScrollView>
    )
}

const style= StyleSheet.create({
    add:{
        color:"#D15D5D",
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20
    },
    body:{
        flex: 1,
        backgroundColor:'#404040'
    },
    title:{
        marginBottom: 15,
        color: "#D15D5D",
        width: '100%',
        fontSize: 30,
        fontWeight:'bold',
        padding:15,
    },  
    FormContainer:{
        justifyContent:"center",
        width:'100%',
        paddingHorizontal:15,
        paddingTop:0
    },
    container: {
        backgroundColor: 'white',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    labelsCont:{
        width:'100%'
    },
    labels:{
        color: '#404040',
        fontSize:20,
        paddingTop: 21,
        paddingRight: 10,
        textAlign:'left'
    },
    inputsCont:{
        width:'60%'
    },
    inputs:{
        backgroundColor:'#d9d9d9',
        borderRadius:15,
        fontSize:15,
        marginTop: 5,
        paddingHorizontal:15
    },
    submit: {
        backgroundColor: '#D15D5D',
        height: 60,
        width: 300,
        marginBottom: 20
    },
})