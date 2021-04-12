import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer'

import { Pass } from '../screens/passwords';
import { Network } from '../screens/network';
import { Generator } from '../screens/Generate';
import { Header } from '../shared/header';
import { AuthContext } from '../component/AuthContext';

const DrawerNav = createDrawerNavigator();

export function HomeNav() {

  let { signOut } = React.useContext(AuthContext);

  return(
    <DrawerNav.Navigator 
    initialRouteName="Pass" 
    drawerType='slide' 
    drawerStyle={{backgroundColor:"#D15D5D"}}
    drawerContentOptions={{
      activeTintColor: "#D15D5D",
      activeBackgroundColor: '#404040',
      paddingTop: 0,
    }}
    drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="LOGOUT" onPress={()=>{signOut()}} style={{backgroundColor:'white'}} />
        </DrawerContentScrollView>
      )
    }}
    >
      <DrawerNav.Screen name="Passwords" component={Pass} />
      {/* <DrawerNav.Screen name="Networks" component={Network} /> */}
      <DrawerNav.Screen name="Generator" component={Generator} />
    </DrawerNav.Navigator>
  )
}