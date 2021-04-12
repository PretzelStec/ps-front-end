import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Clipboard,
    Alert,
    Linking
} from 'react-native';
import { AuthContext } from '../component/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import Encryption from '../component/encyption';
import OptionMenu from '../shared/optionMenu';
import Axios from 'axios';

//import {Clipboard} from '@react-native-community/clipboard'


export function DataCard ({type, title, entryEmail, entryPass, notes, url, id, section}) {

    const [active, setActive] = React.useState(false);
    const [showPass, setShowPass] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);

    let { token, email, password } = React.useContext(AuthContext);

    title = title ? Encryption.decipher(title, email+password).toString() : undefined;
    entryEmail = entryEmail ? Encryption.decipher(entryEmail, email+password).toString() : undefined;
    entryPass = entryPass ? Encryption.decipher(entryPass, email+password).toString() : undefined;
    url = url ? Encryption.decipher(url, email+password).toString() : undefined;

    const deleteData = () => {
        Alert.alert("Are you sure?", "Deleting this is permanent!", [{text:"Cancel"}, {test:"OK", onPress: () => {
            const config = {
                'authorization': 'Bearer '+ token,
                'accept':'application/json',
                'content-type':'application/json'
            }
        
            Axios.delete('https://password-safe-backend.herokuapp.com/api/'+type+'/' + id, {headers:config})
            .then((res) => {
                console.log(res.status)
            })
            .catch(err => {
                console.log(err)
            })
        }}])
        
    }

    const EditCard = () => {

        const patchData = (data) => {            
            Alert.alert("Are you sure?", "Editing this is permanent!", [{text:"Cancel"}, {test:"OK", onPress: () => {
                const config = {
                    'authorization': 'Bearer '+ token,
                    'accept':'application/json',
                    'content-type':'application/json'
                }
            
                Axios.patch('https://password-safe-backend.herokuapp.com/api/'+type+'/' + id, data ,{headers:config})
                .then((res) => {

                    setIsEditing(false)
                })
                .catch(err => {
                    console.log(err)
                })
            }}])
        }

        let editStyle = StyleSheet.create({
            container:{
                backgroundColor: 'white',
                borderRadius: 0,
                flexGrow: 1,
                marginTop:15,
                width:'100%',
                alignSelf:'center',
                borderRadius: 15,
                padding:20,
            },
            label:{
                paddingTop:5,
                paddingLeft:5,
                color:'#404040'
            },
            editTitle:{
                paddingLeft: 15,
                backgroundColor: '#dddddd',
                borderRadius:15,
            },
            editSubtitle:{
                paddingLeft: 15,
                backgroundColor: '#dddddd',
                borderRadius:15,
                color: '#404040'
            },
            editPassword:{
                width:'100%',
                flexDirection:'row',
                backgroundColor: '#dddddd',
                paddingHorizontal: 15,
                //paddingVertical:10,
                borderRadius:15
            },
            editUrl:{
                width:'100%',
                flexDirection:'row',
                backgroundColor: '#dddddd',
                paddingHorizontal: 15,
                //paddingVertical:10,
                borderRadius:15
            },
            icon:{
                position:'absolute',
                paddingTop:2,
                right:10,
            },
        })

        let [titleInput, setTitleInput] = React.useState(title)
        let [subInput, setSubInput] = React.useState(entryEmail)
        let [passwordInput, setPasswordInput] = React.useState(entryPass)
        let [urlInput, setUrlInput] = React.useState(url)
        let [sectionInput, setSectionInput] = React.useState(section)

        let key = email+password;
        return(
            <View style={editStyle.container}>
                <Text style={editStyle.label}>Title</Text>
                <TextInput style={editStyle.editTitle} defaultValue={title} onChangeText={(value)=>{setTitleInput(value)}} />

                <Text style={editStyle.label}>Email/Network</Text>
                <TextInput style={editStyle.editSubtitle} defaultValue={entryEmail} onChangeText={(value)=>{setSubInput(value)}} />

                <Text style={editStyle.label}>Password</Text>
                <View style={editStyle.editPassword}>
                    <TextInput style={{width: '100%'}} editable={true} secureTextEntry={!showPass} defaultValue={entryPass} onChangeText={(value)=>{setPasswordInput(value)}}/>
                    <MaterialIcons style={editStyle.icon} name={showPass ? "visibility-off" : "visibility"} size={25} onPress={() => setShowPass(!showPass)}/>
                </View>

                <Text style={editStyle.label}>URL (for passwords)</Text>
                <TextInput style={editStyle.editUrl} defaultValue={url} onChangeText={(value)=>{setUrlInput(value)}} />

                <Text style={editStyle.label}>Folder</Text>
                <TextInput style={editStyle.editUrl} defaultValue={section} onChangeText={(value)=>{setSectionInput(value)}} />

                <View style={{flexDirection:'row', alignSelf:'center'}}>
                    <TouchableOpacity 
                        onPress={() => {setIsEditing(false)}}
                        style={{
                            justifyContent:'center',
                            alignSelf:'center',
                            alignItems:'center',
                            backgroundColor:'#D15D5D',
                            width: 100,
                            height: 35,
                            marginTop: 15,
                            borderRadius: 15,
                            marginRight: 15,
                        }}
                    >
                        <Text style={{color:'white'}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {patchData({
                            title: Encryption.cipher(titleInput, key), 
                            email:Encryption.cipher(subInput, key), 
                            password:Encryption.cipher(passwordInput, key), 
                            url:Encryption.cipher(urlInput, key),
                            section:sectionInput
                        })
                    }}
                        style={{
                            justifyContent:'center',
                            alignSelf:'center',
                            alignItems:'center',
                            backgroundColor:'#D15D5D',
                            width: 100,
                            height: 35,
                            marginTop: 15,
                            borderRadius: 15,
                            }}
                    >
                        <Text style={{color:'white'}}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        isEditing ? <EditCard /> :
        <TouchableOpacity activeOpacity={0.7} style={active ? Styles.active : Styles.container} onPress={() => setActive(!active)}>
            <View style={{flexDirection:'row'}}>
                <View>
                    <Text style={Styles.title}>{title}</Text>
                    <Text style={Styles.subtitle}>{entryEmail}</Text>
                </View>
                <View style={{position:'absolute', right: 15}}>
                    <OptionMenu  
                        customButton={
                            <MaterialIcons 
                                style={{color: '#404040'}}
                                name='more-horiz' 
                                size={35} 
                            />
                        }
                        
                        options={['Edit', 'Delete']}
                        actions={[() => {setIsEditing(true)}, deleteData]}
                    />
                </View>
            </View>
            {
            active ? (
            <View>
                <View style={Styles.password}>
                    <TextInput style={{color:'black', fontSize:20}} editable={false} secureTextEntry={!showPass} defaultValue={entryPass} />
                    <MaterialIcons style={Styles.iconCopy} name={showPass ? "visibility-off" : "visibility"} size={28} onPress={() => setShowPass(!showPass)}/>
                    <MaterialIcons style={Styles.icon} name="content-copy" size={28} onPress={() => { Clipboard.setString(entryPass); Alert.alert("Password Copied", "You can now paste your password.")}}/>
                </View>

                <View style={Styles.tools}>
                    {url ? 
                        <MaterialIcons 
                        name='web' 
                        size={30} 
                        onPress={() => {Linking.openURL(url)}}
                        style={{
                                position: 'absolute',
                                backgroundColor:'#D15D5D',
                                color:'black',
                                marginTop: 15,
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                borderRadius: 15,
                            }}
                        />
                    : null}
                </View>
                
            </View>
            ) : 
            (null)
            }
        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        borderRadius: 0,
        flexGrow: 1,
        marginTop:15,
        width:'100%',
        alignSelf:'center',
        justifyContent: 'center',
        borderRadius: 15,
        padding:15
    },
    active:{
        backgroundColor: 'white',
        borderRadius: 0,
        flexGrow: 1,
        marginTop:15,
        width:'100%',
        alignSelf:'center',
        borderRadius: 15,
        padding:15,
        paddingBottom:65
    },
    title:{
        textTransform:'uppercase',
        fontSize:28,
        fontWeight:'bold',
        color:'#D15D5D'
    },
    subtitle:{
        color: '#404040'
    },
    password:{
        width:'100%',
        flexDirection:'row',
        marginTop: 20,
        backgroundColor: '#dddddd',
        paddingHorizontal: 15,
        paddingVertical:10,
        borderRadius:15
    },
    icon: {
        position:'absolute',
        paddingTop:10,
        right:10,
    },
    iconCopy:{
        position:'absolute',
        paddingTop:10,
        right:40,
    },
    tools:{
        flexDirection: 'row',
        width:'100%',
        paddingTop: 15
    }, 
})