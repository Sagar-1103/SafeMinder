import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const FallAlert = () => {
  const [opacityLevels, setOpacityLevels] = useState([1, 0.7, 0.4, 0.1]); // Initial opacities for circles
  const slideAnim = useState(new Animated.Value(-width))[0]; // Animation for sliding button horizontally

  useEffect(() => {
    // Animation loop to change opacities
    const interval = setInterval(() => {
      setOpacityLevels((prev) => {
        // Shift opacity levels to create the animation effect
        const newOpacities = [...prev];
        const lastOpacity = newOpacities.pop();
        newOpacities.unshift(lastOpacity);
        return newOpacities;
      });
    }, 240); // Update every 240ms

    // Slide the button into view from the left
    Animated.timing(slideAnim, {
      toValue: width * 0.1, // Final position (slightly inset from the left)
      duration: 800,
      useNativeDriver: false,
    }).start();

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slideAnim]);

  return (
    <View style={styles.container}>
      {/* Linear Gradient Background */}
      <LinearGradient
        colors={['#FF4500', '#FF8500']} // Orange gradient
        style={styles.gradient}
      >
        <Text style={styles.title}>Fall Detected</Text>

        {/* Animated Circles */}
        <View style={styles.animationContainer}>
          {opacityLevels.map((opacity, index) => (
            <View
              key={index}
              style={[
                styles.circle,
                {
                  width: width * 0.3 + index * 40, // Circles grow larger
                  height: width * 0.3 + index * 40,
                  borderRadius: (width * 0.3 + index * 40) / 2,
                  opacity: opacity,
                },
              ]}
            />
          ))}
        </View>

        {/* Center Image */}
        <Image
          source={require('../../assets/sms.png')} // Replace with your PNG image path
          style={styles.image}
        />

        {/* Sliding Cancel Button */}
        <Animated.View style={[styles.cancelButtonContainer, { left: slideAnim }]}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default FallAlert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.13, // Dynamic font size
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    top: height * 0.1, // Relative positioning
  },
  animationContainer: {
    position: 'absolute',
    width: width * 0.8, // Responsive size
    height: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Transparent white
  },
  image: {
    width: width * 0.25, // Responsive image size
    height: width * 0.25,
  },
  cancelButtonContainer: {
    position: 'absolute',
    bottom: height * 0.1, // Position near the bottom
    width: width * 0.8,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  cancelButtonText: {
    color: '#FF4500',
    fontSize: width * 0.05, // Dynamic font size
    fontWeight: 'bold',
  },
});
