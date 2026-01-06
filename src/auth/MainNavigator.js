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

const Stack = createNativeStackNavigator();
function MainNavigator() {
return (
<NavigationContainer>
<Stack.Navigator screenOptions={{ headerShown: false }}>

<Stack.Screen name='SplashScreen' component={SplashScreen} />
<Stack.Screen name='IntroScreen' component={IntroScreen} />
<Stack.Screen name='Login' component={Login} />
<Stack.Screen name='HomeScreen' component={BottomNavigator} />
<Stack.Screen name='MyProfile' component={MyProfile} />
<Stack.Screen name='Terms' component={Terms} />
<Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
<Stack.Screen name='EditProfileScreen' component={EditProfileScreen} />


</Stack.Navigator>
</NavigationContainer>
);
}
export default MainNavigator;