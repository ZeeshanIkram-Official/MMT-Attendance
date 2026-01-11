import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  useColorScheme,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Ticket = () => {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  const theme = {
    background: isDark ? '#101317' : '#F9FAFB',
    card: isDark ? '#1E242A' : '#FFFFFF',
    text: isDark ? '#f5f5f5' : '#111827',
    subText: isDark ? '#bbb' : '#6B7280',
    headerBg: isDark ? '#202327' : '#F3F4F6',
    headerText: '#0a74ff',
    border: isDark ? '#333' : '#E5E7EB',
    button: '#0a74ff',
    buttonText: '#fff',
  }

  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem('authToken')
      const response = await axios.get(
        'https://stagging.mightymediatech.com/api/slips',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      )
      setRecords(response.data.records || [])
    } catch (error) {
      console.log('API error:', error.response || error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchTickets()
  }

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <View style={styles.loaderWrapper}>
                <Image
                  source={require('../assets/only.png')}
                  style={styles.logo}
                />
        
                <ActivityIndicator
                  size="large"
                  color='#0a74ff'
                  style={styles.loader}
                />
              </View>
        <Text style={styles.loadingText}>Loading slips...</Text>
      </View>
    )
  }

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
      style={[styles.container, { backgroundColor: theme.background }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.button]}
        />
      }
    >
      {/* Header / Logo */}
      <View style={[styles.logoContainer, { backgroundColor: theme.headerBg }]}>
        <Image source={require('../assets/mmtlogo.png')} style={styles.logoImage} resizeMode="contain" />
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: theme.card, shadowColor: '#000' }]}>
          <Text style={[styles.statNumber, { color: theme.text }]}>Pay Slips</Text>
        </View>
      </View>

      {/* Records */}
      <View style={styles.listContainer}>
        {records.length ? records.map(item => (
          <View
            key={item.id}
            style={[
              styles.card,
              { backgroundColor: theme.card, borderColor: theme.border }
            ]}
          >
            <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
            <Text style={[styles.code, { color: theme.subText }]}>{item.employee_code}</Text>

            {item.slip ? (
              <View style={styles.slipBox}>
                <Text style={[styles.slipText, { color: theme.text }]}>Status: {item.slip.status}</Text>
                <Text style={[styles.slipDate, { color: theme.subText }]}>Date: {item.slip.date}</Text>

                <TouchableOpacity
                  style={[styles.openBtn, { backgroundColor: theme.button }]}
                  onPress={() => Linking.openURL(item.slip.image)}
                >
                  <Text style={[styles.openBtnText, { color: theme.buttonText }]}>View PDF</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={[styles.noSlip, { color: theme.subText }]}>Slip not generated</Text>
            )}
          </View>
        )) : (
          <Text style={[styles.noDataText, { color: theme.subText }]}>
            No slips available.
          </Text>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loaderWrapper: { width: 50, height: 50, justifyContent: 'center', alignItems: 'center'},
  logo: { width: 20, height: 20, resizeMode: 'contain', position: 'absolute', zIndex: 1 },
  loader: { position: 'absolute',  },
  loadingText: { marginTop: 8, fontSize: 18, color: '#0a74ff' },

  logoContainer: { height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 10, elevation:4 },
  logoImage: { width: 250, height: 250 },

  statsContainer: { paddingHorizontal: 16, marginBottom: 10 },
  statCard: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  statNumber: { fontSize: 28, fontWeight: 'bold' },

  listContainer: { paddingHorizontal: 16, paddingBottom: 20 },
  card: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 14,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2
  },
  name: { fontSize: 16, fontWeight: '600' },
  code: { fontSize: 14, marginTop: 4 },

  slipBox: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#ddd' },
  slipText: { fontSize: 14, fontWeight: '600' },
  slipDate: { fontSize: 13, marginTop: 2 },

  openBtn: { marginTop: 10, paddingVertical: 10, borderRadius: 8, alignItems: 'center', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 2 },
  openBtnText: { fontSize: 14, fontWeight: '600' },

  noSlip: { marginTop: 8, fontSize: 13 },
  noDataText: { textAlign: 'center', marginTop: 20, fontSize: 14 }
})

export default Ticket
