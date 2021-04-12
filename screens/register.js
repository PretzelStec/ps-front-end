import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Image 
} from 'react-native';
import { AuthContext } from '../component/AuthContext';

export function Register({navigation}) {

  let {signUp, registerError} = React.useContext(AuthContext);

  const [password, changePassword] = React.useState('');
  const [email, changeEmail] = React.useState('');
  const [confirmPass, changeConfirmPass] = React.useState('');


  return (
    <View style={styles.container} >
      <Image source={require('../assets/logo1.png')} style={{width:300, height:300}}/>

      {registerError && <Text style={styles.valid}>Registration Error</Text>}

      <TextInput style={styles.entry} placeholder="Email" textContentType="emailAddress"  onChangeText={(text) => {changeEmail(text)}}/>
      <TextInput style={styles.entry} placeholder="Password" textContentType="password" onChangeText={(text) => {changePassword(text)}}/>
      <TextInput style={styles.entry} placeholder="Confirm Password" textContentType="password" onChangeText={(text) => {changeConfirmPass(text)}}/>
      
      <TouchableOpacity style={styles.submit} onPress={async () => {signUp(email, password)}}>
        <Text style={{fontSize: 20, fontWeight:'bold', color:'#D15D5D'}}>Register</Text>
      </TouchableOpacity>

      <Text style={{marginTop:50}}>Already have an account? <Text style={{color:"lightblue"}} onPress={() => navigation.navigate('Login')}>Log In.</Text></Text>
      
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
