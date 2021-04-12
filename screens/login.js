import React from 'react';
//import {FormData} from 'FormData';

import {AuthContext} from '../component/AuthContext';

import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Image
} from 'react-native';

export function Login({navigation}) {

  const [password, changePassword] = React.useState('');
  const [email, changeEmail] = React.useState('');
  const { signIn, loginError } = React.useContext(AuthContext);

  return (
    <View style={styles.container} >
      
        <Image source={require('../assets/logo1.png')} style={{width:300, height:300}}/>

        {loginError && <Text style={styles.valid}>Invalid Login</Text>}
        <TextInput style={styles.entry} placeholder="Email" textContentType="emailAddress" keyboardType="email-address" onChangeText={(text) => {changeEmail(text)}}/>
        <TextInput style={styles.entry} secureTextEntry={true} placeholder="Password" textContentType="password" onChangeText={(text) => {changePassword(text)}}/>

        
        <TouchableOpacity style={styles.submit} onPress={async () => {signIn(email, password)}}>
          <Text style={{fontSize: 20, fontWeight:'bold', color:'#D15D5D'}}>Login</Text>
        </TouchableOpacity>

        <Text style={{marginTop:25}}>Don't have an account? <Text style={{color:"lightblue"}} onPress={() => navigation.push('Register')}>Sign Up</Text></Text>
        <Text style={{color:"lightblue", marginTop:25}} onPress={() => navigation.push('Forgot')}>Forgot Password?</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  valid: {
    height:30,
    width: 220,
    paddingTop:5,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'red',
    borderColor: 'red'
  },  
  container: {
    flex: 1,
    backgroundColor: '#D15D5D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    alignItems: 'flex-end',
    marginLeft: 5,
    marginTop: 15,
    alignItems: 'center',
    //justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  entry: {
    borderBottomColor: '#404040',
    borderBottomWidth: 2,
    width: 220,
    marginLeft: 8,
    marginTop: 34,
    fontSize: 15,
    color: "#404040"
  },
  submit: {
    marginTop: 40,
    backgroundColor:"#404040",
    height: 60,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#404040'
  }
});
