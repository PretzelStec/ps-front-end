import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Image,
    ImageBackground
} from 'react-native';

export function About({navigation}) {

  return (
  //  <ImageBackground style={{width:'100%', height:'100%', resizeMode:'cover'}} source={require('../assets/Untitled-1.gif')}>
    <View style={styles.container} >
      <Image source={require('../assets/logo1.png')} style={{width:300, height:300}} />


      <Text textBreakStrategy={'balanced'} style={styles.text}>This app was developed by Jacob Stec for his bachelors of science capstone. Implements data encrytption to keep passwords and other sensitive data safe but available on a multitude of devices.</Text>

      
      <TouchableOpacity style={styles.submit} onPress={() => navigation.navigate('Login')}>
        <Text style={{fontSize: 20, fontWeight:'bold', color:'#D15D5D'}}>Get Started</Text>
      </TouchableOpacity>
    </View>
  //  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D15D5D'
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
    alignSelf:'center',
    marginHorizontal:30,
    marginVertical: 40,
    fontSize: 16,
    textAlign:'center',
    fontWeight: 'bold',
    color: '#404040'
  }
});
