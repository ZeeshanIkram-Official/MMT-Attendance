import { View, Text, ScrollView, StyleSheet, ActivityIndicator, RefreshControl, useColorScheme, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

const Ticket = () => {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  const theme = {
    background: isDark ? '#101317' : '#F9FAFB',
    card: isDark ? '#202327' : '#FFFFFF',
    text: isDark ? '#f5f5f5' : '#111827',
    subText: isDark ? '#bbb' : '#6B7280',
    headerBg: isDark ? '#202327' : '#F3F4F6',
    headerText: '#FFFFFF',
    border: isDark ? '#333' : '#e5e7eb',
  }

  const [stats, setStats] = useState(null)
  const [tickets, settickets] = useState(null)
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
        'https://stagging.mightymediatech.com/api/tickets/lead',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      )

      setStats(response.data.data.statistics)
      settickets(response.data.data.user)
    } catch (error) {
      console.log(error)
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
            color="#2e86de"
            style={styles.loader}
          />
        </View>
        <Text style={styles.loadingText}>Loading tickets...</Text>
      </View>
    )
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#0a74ff']}
          progressBackgroundColor={theme.background}
          tintColor={theme.subText}
        />
      }
    >
      <View style={[styles.logoContainer, { backgroundColor: theme.headerBg }]}>
        <Image source={require('../assets/mmtlogo.png')} style={styles.logoImage} resizeMode="contain" />
      </View>

        <View
          style={[
            styles.statCard,
            {
              backgroundColor: theme.card,
              shadowColor: '#000',
              flexDirection: 'row',
              alignItems: 'center',
               width:'85%',
               alignSelf:'center'
            }
          ]}
        >
          <Entypo name="ticket" size={28} color="#0a74ff" />
          <Text style={[styles.Tickettxt, { color: theme.text }]}>Tickets</Text>
        </View>

      {stats && (
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: theme.card }, styles.totalCard]}>
              <View style={styles.statIconContainer}>
                <Ionicons name="stats-chart" size={28} color="#4F46E5" />
              </View>
              <Text style={[styles.statNumber, { color: theme.text }]}>{stats.total_tickets}</Text>
              <Text style={[styles.statLabel, { color: theme.subText }]}>Total Tickets</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: theme.card }, styles.pendingCard]}>
              <View style={styles.statIconContainer}>
                <Ionicons name="time-outline" size={28} color="#F59E0B" />
              </View>
              <Text style={[styles.statNumber, { color: theme.text }]}>{stats.pending_tickets}</Text>
              <Text style={[styles.statLabel, { color: theme.subText }]}>Pending</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: theme.card }, styles.closedCard]}>
              <View style={styles.statIconContainer}>
                <Ionicons name="checkmark-done-outline" size={28} color="#10B981" />
              </View>
              <Text style={[styles.statNumber, { color: theme.text }]}>{stats.closed_tickets}</Text>
              <Text style={[styles.statLabel, { color: theme.subText }]}>Closed</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: theme.card }, styles.forwardedCard]}>
              <View style={styles.statIconContainer}>
                <Ionicons name="arrow-up-outline" size={28} color="#3B82F6" />
              </View>
              <Text style={[styles.statNumber, { color: theme.text }]}>{stats.forwarded_tickets}</Text>
              <Text style={[styles.statLabel, { color: theme.subText }]}>Forwarded</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 16, fontWeight: '500', color:'#0a74ff' },
  loaderWrapper: { width: 50, height: 50, justifyContent: 'center', alignItems: 'center'},
  logo: { width: 20, height: 20, resizeMode: 'contain', position: 'absolute', zIndex: 1 },
  loader: { position: 'absolute' },
  logoContainer: { height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 10, elevation:4 },
  logoImage: { width: 250, height: 250 },
  statsContainer: { paddingHorizontal: 16, marginTop:50 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
    justifyContent:'center'
  },
  statIconContainer: { marginBottom: 8 },
  statNumber: { fontSize: 32, fontWeight: 'bold', marginBottom: 4 },
  Tickettxt: { fontSize: 32, fontWeight: 'bold', marginBottom: 4, },

  statLabel: { fontSize: 13, fontWeight: '600', textAlign: 'center' },
  totalCard: { borderLeftWidth: 4, borderLeftColor: '#4F46E5' },
  pendingCard: { borderLeftWidth: 4, borderLeftColor: '#F59E0B' },
  closedCard: { borderLeftWidth: 4, borderLeftColor: '#10B981' },
  forwardedCard: { borderLeftWidth: 4, borderLeftColor: '#3B82F6' },
})

export default Ticket
