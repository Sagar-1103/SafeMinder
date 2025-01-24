import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Charts = ({ chartData, chartConfig }) => {
  const screenWidth = Dimensions.get('window').width;

  // Default chartConfig (if not provided)
  const defaultChartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFFFFF',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    useShadowColorFromDataset: false,
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={screenWidth * 0.75}
        height={200}
        verticalLabelRotation={30}
        chartConfig={chartConfig || defaultChartConfig}
        // bezier
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Charts;