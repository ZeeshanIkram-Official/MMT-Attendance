import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login'
import ProfileScreen from './ProfileScreen'
import EditProfileScreen from './EditProfileScreen'

const Stack = createNativeStackNavigator();
function MainNavigator() {
return (
<NavigationContainer>
<Stack.Navigator screenOptions={{ headerShown: false }}>

<Stack.Screen name='Login' component={Login} />
<Stack.Screen name='ProfileScreen' component={ProfileScreen} />
<Stack.Screen name='EditProfileScreen' component={EditProfileScreen} />


</Stack.Navigator>
</NavigationContainer>
);
}
export default MainNavigator;