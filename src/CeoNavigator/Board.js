import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart, ProgressChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const DashBoar = () => {
  // Status colors - same as your image
  const statusColors = {
    Present: '#4CAF50',    // Green
    Leave: '#FFC107',      // Yellow/Amber
    Absent: '#F44336',     // Red
  };

  // Employee Status - Line Chart (trend jaisa)
  const employeeStatus = {
    labels: ['Present', 'On Leave', 'Absent'],
    data: [0, 1, 23],  // real data from your image
  };

  // Permanent Employees - Bar Chart
  const permanentEmployees = {
    labels: ['Present', 'Leave', 'Absent'],
    data: [0, 1, 22],
    colors: [statusColors.Present, statusColors.Leave, statusColors.Absent],
  };

  // Interns - Progress Chart (semi-circle)
  const interns = {
    labels: ['Present', 'Leave', 'Absent'],
    data: [0, 3, 2],           // total = 2
    colors: [statusColors.Present, statusColors.Leave, statusColors.Absent],
  };

  // Staff Overview - Simple Bar
  const staffOverview = {
    labels: ['Interns', 'Employees'],
    data: [2, 23],
  };

  // Main chart config (white + clean look)
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
  };

  // Helper for colored counts
  const renderCounts = (labels, data, customColors = null) => {
    return (
      <View style={styles.countRow}>
        {labels.map((label, index) => (
          <View key={index} style={styles.countItem}>
            <Text style={[
              styles.countLabel,
              customColors && { color: customColors[label] || '#000' }
            ]}>
              {label}
            </Text>
            <Text style={styles.countValue}>{data[index]}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {/* 1. Employee Status - Line Chart with gradient area */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Employee Status</Text>
        <LineChart
  data={{
    labels: employeeStatus.labels,
    datasets: [{ data: employeeStatus.data }],
  }}
  width={screenWidth - 40}
  height={220}
  chartConfig={{
    ...chartConfig,
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // blue line
    fillShadowGradient: '#2196F3',
    fillShadowGradientOpacity: 0.4,
    // Y-axis ke numbers ko thoda adjust karne ke liye (optional)
    propsForLabels: { fontSize: 12 },
  }}
  bezier
  style={styles.chartStyle}
  withDots={true}                // ← Dots on kar den (default true hota hai)
  withShadow={true}
  withHorizontalLines={false}
  withVerticalLines={false}
  withInnerLines={false}
  withOuterLines={false}
  // ← Ye important prop: har dot ke upar value show karega
  renderDotContent={({ x, y, index, indexData }) => (
    <View
      style={{
        position: 'absolute',
        left: x - 15,           // center karne ke liye adjust karen
        top: y - 35,            // upar kitna space chahiye (image jaisa feel ke liye 30-40 try karen)
        backgroundColor: 'rgba(33, 150, 243, 0.9)', // blue semi-transparent box
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        minWidth: 30,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 12,
          fontWeight: 'bold',
        }}
      >
        {indexData}        
      </Text>
    </View>
  )}
/>
        {renderCounts(employeeStatus.labels, employeeStatus.data, statusColors)}
      </View>

      {/* 2. Permanent Employees - Bar with custom colors per bar */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Permanent Employees</Text>
        <BarChart
          data={{
            labels: permanentEmployees.labels,
            datasets: [{
              data: permanentEmployees.data,
            }],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chartStyle}
          showBarTops={true}
          withCustomBarColorFromData={true}
          flatColor={true}
          withHorizontalLines={false}
          withVerticalLines={false}
          withInnerLines={false}
          withOuterLines={false}
          // Very important for different colors per bar
          barColors={permanentEmployees.colors}
        />
        {renderCounts(permanentEmployees.labels, permanentEmployees.data, statusColors)}
      </View>

      {/* 3. Interns - Progress Chart with segment colors */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Interns</Text>
        <ProgressChart
          data={{
            labels: interns.labels,
            data: interns.data.map(v => v / 2), // total = 2 interns
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            ...chartConfig,
            color: (opacity, index) => {
              const colorMap = [statusColors.Present, statusColors.Leave, statusColors.Absent];
              return colorMap[index] || '#999';
            },
          }}
          style={styles.chartStyle}
          hideLegend={false}
        />
        {renderCounts(interns.labels, interns.data, statusColors)}
      </View>

      {/* 4. Staff Overview */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Staff Overview</Text>
        <BarChart
          data={{
            labels: staffOverview.labels,
            datasets: [{ data: staffOverview.data }],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            ...chartConfig,
            color:() =>'#845eca', // green
          }}
          style={styles.chartStyle}
          withHorizontalLines={false}
          withVerticalLines={false}
          withInnerLines={false}
          withOuterLines={false}
        />
        {renderCounts(staffOverview.labels, staffOverview.data)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f4f4f4' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8, color: '#333' },
  chartStyle: { borderRadius: 10, alignSelf: 'center' },
  countRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 },
  countItem: { alignItems: 'center' },
  countLabel: { fontSize: 13, color: '#666', marginBottom: 4 },
  countValue: { fontSize: 18, fontWeight: 'bold', color: '#000' },
});

export default DashBoar;