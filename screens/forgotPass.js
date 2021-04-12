import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Image 
} from 'react-native';

export function ForgotPassword({navigation}) {

  const [email, changeEmail] = React.useState('');

  return (
    <View style={styles.container} >
      <Image source={require('../assets/logo1.png')} style={{width:300, height:300}}/>


      <TextInput style={styles.entry} placeholder="Email" textContentType="emailAddress"  onChangeText={(text) => {changeEmail(text)}}/>

      
      <TouchableOpacity style={styles.submit} onPress={() => console.log('Sending recovery to : ' + email)}>
        <Text style={{fontSize: 20, fontWeight:'bold', color:'#D15D5D'}}>Submit</Text>
      </TouchableOpacity>

      <Text style={{marginTop:50}}>Finished up? <Text style={{color:"lightblue"}} onPress={() => navigation.navigate('Login')}>Sign In</Text></Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
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
