import React, { useEffect } from 'react';
import { View, Image, StyleSheet, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const firstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        const token = await AsyncStorage.getItem('authToken');
        const user = await AsyncStorage.getItem('userData');

        if (!firstLaunch) {
          await AsyncStorage.setItem('isFirstLaunch', 'true');
          navigation.replace('IntroScreen');
          return;
        }

        if (token && user) {
          const parsedUser = JSON.parse(user); // parse before using

          const isHR =
            Array.isArray(parsedUser.roles) &&
            parsedUser.roles.some(
              role => role.name === 'HR' || role.name === 'hr'
            );

          const isCeo =
            Array.isArray(parsedUser.roles) &&
            parsedUser.roles.some(
              role => role.name === 'CEO' || role.name === 'Ceo'
            );

          if (isCeo) {
            navigation.replace('Board');
          } else if (isHR) {
            navigation.replace('HomeScree');
          } else {
            navigation.replace('HomeScreen');
          }
          return;
        }

        navigation.replace('Login');
      } catch (error) {
        console.log('❌ Splash Error:', error.message);
        navigation.replace('Login');
      }
    };

    const timer = setTimeout(checkLoginStatus, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#121212' : '#fff' },
      ]}
    >
      <Image source={require('../assets/mmtlogo.png')} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { height: 500, width: 500, resizeMode: 'contain' },
});
