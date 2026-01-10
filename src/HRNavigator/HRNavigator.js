import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image, StyleSheet, TouchableOpacity, View, useColorScheme, Modal, Text } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/Ionicons'

import HomeScree from './HomeScree'
import Leave from './Leave'
import ProfileScree from './ProfileScree'
import DashBoar from './DashBoar'

const Tab = createBottomTabNavigator()

const HRNavigator = ({ navigation }) => {
  const isDark = useColorScheme() === 'dark'
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { height: 100, backgroundColor: isDark ? '#202327' : '#fff' },
          headerTitle: () => (
            <Image
              source={require('../assets/mmtlogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)}>
              <Entypo
                name="dots-three-vertical"
                size={22}
                color={isDark ? '#fff' : '#000'}
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: '#0573bb',
          tabBarInactiveTintColor: '#fff',
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ focused, color }) => {
            let iconName, IconComponent
            if (route.name === 'Home') { iconName = 'home'; IconComponent = Entypo }
            else if (route.name === 'DashBoard') { iconName = 'grid'; IconComponent = Entypo }
            else if (route.name === 'Leaves') { iconName = 'calendar'; IconComponent = Entypo }
            else if (route.name === 'ProfileScreen') { iconName = 'person'; IconComponent = MaterialIcons }

            if (focused) {
              return (
                <View style={styles.activeIconContainer}>
                  <IconComponent name={iconName} size={28} color="#0a74ff" />
                </View>
              )
            }
            return <IconComponent name={iconName} size={28} color="#fff" />
          },
        })}
      >
        <Tab.Screen name="DashBoard" component={DashBoar} />
        <Tab.Screen name="Home" component={HomeScree} />
        <Tab.Screen name="Leaves" component={Leave} />
        <Tab.Screen name="ProfileScreen" component={ProfileScree} />
      </Tab.Navigator>

      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={styles.modalOverlayRight}>
          <View style={[styles.modalRightContent,
          { backgroundColor: isDark ? '#202327' : '#fff' }
          ]}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <AntDesign name="closecircle" size={26} color="#0a74ff" />
            </TouchableOpacity>
            <View style={styles.modalDivider} />
            <Image source={require('../assets/mmtlogo.png')} style={styles.modalLogo} />
            <TouchableOpacity
              style={[styles.modalOption,
                { backgroundColor: isDark ? '#000' : '#F9F9F9' }
               ]}
              onPress={() => {
                setModalVisible(false)
                navigation.navigate('Ticket')
              }}
            >
              <Entypo name="ticket" size={20} color="#0a74ff" />
              <Text style={[styles.modalText, {color: isDark ? '#fff' : '#000'}]}>Ticket</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalOption,
                { backgroundColor: isDark ? '#000' : '#F9F9F9' }
               ]}
              onPress={() => {
                setModalVisible(false)
                navigation.navigate('PaySlip')
              }}
            >
              <FontAwesome5 name="receipt" size={20} color="#0a74ff" />
              <Text style={[styles.modalText, {color: isDark ? '#fff' : '#000'}]}>Slip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0a74ff',
    height: 55,
    elevation: 5,
    borderTopWidth: 0,
    overflow: 'visible',
  },
  activeIconContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 4,
    borderColor: '#0a74ff',
  },
  logo: { width: 250, height: 250 },
  modalOverlayRight: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', flexDirection: 'row', justifyContent: 'flex-end' },
  modalRightContent: {
    width: '65%',
    height: 'auto',
    padding: 20,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: -2, height: 0 },
    shadowRadius: 5,
  },
  closeButton: { alignSelf: 'flex-end', padding: 5, borderRadius: 20, backgroundColor: '#f2f2f2' },
  modalDivider: { height: 1, backgroundColor: '#e0e0e0', marginVertical: 10 },
  modalLogo: { height: 150, width: 250, alignSelf: 'center', },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  modalText: { marginLeft: 12, fontSize: 16, fontWeight: '600' },
})

export default HRNavigator
