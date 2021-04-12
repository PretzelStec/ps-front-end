import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Clipboard,
    Alert
} from 'react-native';

import { 
    createStackNavigator,  
    TransitionPresets
} from '@react-navigation/stack';

import { Header } from '../shared/header';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Stack = createStackNavigator();

export function Generator() {

    //actual screen. should this be changed?? seems kinda messy, but not worth making more files.
    const screen = () => {
        let num = '0123456789';
        let symb = '~!@#$%^&*()_-+={[}]|<,>.?/';
        let lett = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        //set up out user's options on what characters to have.
        let [symbols, setSymbols] = React.useState(true);
        let [numbers, setNumbers] = React.useState(true);
        let [letters, setLetters] = React.useState(true);

        //set up password length. default to 15
        let [passLength, setPassLength] = React.useState(15);

        //default out result to password.. dont worry, it gets changed on load in the use effect below.
        let [result, setResult] = React.useState('password');
        
        //set the min and max for the slider
        const min = 4;
        const max = 26;

        //where we get our passwords get generated. I wanted to put the function outside the screen function but got state issues with the slider.
        const generate = (len, numbers = true, symbols = true, letters = true) => {
            let chars = (numbers ? num : '') + (symbols ? symb : '') + (letters ? lett : '');
            let res = Array(len)
            .fill(chars)
            .map(x => x[Math.floor(Math.random() * x.length)])
            .join('');
            return res;
        }

        //set our initial password
        useEffect(() => {
            setResult(generate(passLength, num+symb+lett))
        }, [])

        //the screen we are returning to go into the stack nav.
        return(
            <View style={{flex: 1, backgroundColor:'#404040'}}>
                <View style={style.container}>
                    <View style={style.resultContainer}>
                        <Text style={style.resultText}>{result}</Text>
                        <MaterialIcons style={style.resultCopy} name="content-copy" size={28} onPress={() => { Clipboard.setString(result); Alert.alert("Password Copied", "You can now paste your password.")}}/>
                    </View>
                    <View style={style.multiSlider}>
                        <MultiSlider 
                            min={min} 
                            max={max} 
                            values={[15]} 
                            showSteps={false} 
                            enableLabel={true}
                            customLabel={() => <Text style={{alignSelf:'center', color:'#404040'}}>{passLength} Characters</Text>}
                            selectedStyle={{
                                backgroundColor:'#D15D5D'
                            }}
                            markerStyle={{
                                backgroundColor:'#D15D5D'
                            }}
                            onValuesChange={(value) => {
                                setPassLength(value[0]);
                                setResult(generate(value[0], numbers, symbols, letters));
                            }    
                        }/>
                    </View>

                    <View style={style.checkView}>
                        <BouncyCheckbox 
                            bounceFriction={5}
                            textStyle={style.checkText}
                            fillColor={'#D15D5D'}
                            iconStyle={{borderColor:'#D15D5D'}}
                            style={style.checkObject}
                            text="Numbers" 
                            isChecked={true} 
                            onPress={(isChecked) => {
                                setNumbers(isChecked);
                                setResult(generate(passLength, isChecked, symbols, letters));
                            }} 
                        />
                        <BouncyCheckbox 
                            bounceFriction={5}
                            textStyle={style.checkText}
                            fillColor={'#D15D5D'}
                            iconStyle={{borderColor:'#D15D5D'}}
                            style={style.checkObject}
                            text="Symbols" 
                            isChecked={true} 
                            onPress={(isChecked) => {
                                setSymbols(isChecked);
                                setResult(generate(passLength, numbers, isChecked, letters));
                            }} 
                        />
                        <BouncyCheckbox 
                            bounceFriction={5}
                            textStyle={style.checkText}
                            fillColor={'#D15D5D'}
                            iconStyle={{borderColor:'#D15D5D'}}
                            style={style.checkObject}
                            text="Letters" 
                            isChecked={true} 
                            onPress={(isChecked) => {
                                setLetters(isChecked);
                                setResult(generate(passLength, numbers, symbols, isChecked));
                            }} 
                        />
                    </View>
                </View>
            </View>
        )
    }

    //returns the screen declared above in a stack with the custom header
    return (
        <Stack.Navigator screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
            <Stack.Screen name={"pass"} component={screen}
                options={{
                    headerTitle: () => <Header title="Generate"/>,
                    headerStyle:{backgroundColor: "#D15D5D"}
                }}
            />
        </Stack.Navigator>
    );
}

const style= StyleSheet.create({
    container:{
        marginTop: 15,
        width: '94%',
        paddingVertical: 50,
        alignSelf: 'center',
        justifyContent: 'center', 
        backgroundColor:'white',
        borderRadius: 15
    },
    resultContainer:{
        width: '92%',
        borderRadius: 15,
        alignSelf:'center',
        marginBottom:20,
        paddingVertical: 10,
        backgroundColor: '#d9d9d9'
    },
    multiSlider:{
        alignItems:'center'
    },
    resultText:{
        fontSize: 17,
        paddingLeft:15,
        color:'#404040'
    },
    resultCopy:{
        paddingTop: 8,
        position: 'absolute',
        right: 10,
        color: '#404040'
    },
    checkView:{
        width:150,
        paddingLeft: '4%',
        alignSelf:'flex-start',
    },
    checkText:{
        textDecorationLine: 'none', 
        color: '#404040',
        paddingTop: 0
    },
    checkObject: {
        paddingTop: 15,
    }
});