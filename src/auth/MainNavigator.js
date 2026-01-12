import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './SplashScreen'
import IntroScreen from './IntroScreen'
import Login from './Login'
import BottomNavigator from '../BottomNavigator/BottomNavigator'
import MyProfile from './MyProfile'
import Terms from './Terms'
import PrivacyPolicy from './PrivacyPolicy'
import EditProfileScreen from './EditProfileScreen'
import Ticket from './Ticket'
import PaySlip from './PaySlip'
import HRNavigator from '../HRNavigator/HRNavigator'
import CEONavigator from '../CeoNavigator/CEONavigator'

const Stack = createNativeStackNavigator();
function MainNavigator() {
return (
<NavigationContainer>
<Stack.Navigator screenOptions={{ headerShown: false }}>

<Stack.Screen name='SplashScreen' component={SplashScreen} />
<Stack.Screen name='IntroScreen' component={IntroScreen} />
<Stack.Screen name='Login' component={Login} />
<Stack.Screen name='HomeScreen' component={BottomNavigator} />
<Stack.Screen name='HomeScree' component={HRNavigator} />
<Stack.Screen name='Board' component={CEONavigator} />


<Stack.Screen name='MyProfile' component={MyProfile} />
<Stack.Screen name='Terms' component={Terms} />
<Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
<Stack.Screen name='EditProfileScreen' component={EditProfileScreen} />
<Stack.Screen name='Ticket' component={Ticket} />
<Stack.Screen name='PaySlip' component={PaySlip} />

</Stack.Navigator>
</NavigationContainer>
);
}
export default MainNavigator;