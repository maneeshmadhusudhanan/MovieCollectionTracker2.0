import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Animated, StyleSheet, Platform } from 'react-native';
import { useEffect, useRef } from 'react';

export default function TabLayout() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const animateTabPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#ffcc00',
          tabBarInactiveTintColor: '#b0b0b0',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'MOVIES',
            tabBarIcon: ({ size, color, focused }) => (
              <Animated.View style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}>
                <Ionicons name="film-outline" size={size} color={color} />
              </Animated.View>
            ),
          }}
          listeners={{
            tabPress: () => animateTabPress(),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: 'ADD MOVIES',
            tabBarIcon: ({ size, color, focused }) => (
              <Animated.View style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}>
                <Ionicons name="add-circle-outline" size={size} color={color} />
              </Animated.View>
            ),
          }}
          listeners={{
            tabPress: () => animateTabPress(),
          }}
        />
      </Tabs>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark mode background
  },
  tabBar: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Glassmorphism effect
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    backdropFilter: 'blur(10px)',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});

// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { View, Animated } from 'react-native';
// import { useEffect, useRef } from 'react';

// export default function TabLayout() {
//   const scaleAnim = useRef(new Animated.Value(1)).current;

//   const animateTabPress = () => {
//     Animated.sequence([
//       Animated.timing(scaleAnim, {
//         toValue: 1.2,
//         duration: 150,
//         useNativeDriver: true,
//       }),
//       Animated.timing(scaleAnim, {
//         toValue: 1,
//         duration: 150,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   };

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: '#ffcc00',
//         tabBarInactiveTintColor: '#b0b0b0',
//         tabBarStyle: {
//           backgroundColor: '#121212',
//           borderTopWidth: 1,
//           borderTopColor: '#333',
//           paddingBottom: 5,
//           paddingTop: 5,
//           height: 60,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: 'bold',
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'MOVIES',
//           tabBarIcon: ({ size, color, focused }) => (
//             <Animated.View style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}>
//               <Ionicons name="film-outline" size={size} color={color} />
//             </Animated.View>
//           ),
//         }}
//         listeners={{
//           tabPress: () => animateTabPress(),
//         }}
//       />
//       <Tabs.Screen
//         name="add"
//         options={{
//           title: 'ADD MOVIES',
//           tabBarIcon: ({ size, color, focused }) => (
//             <Animated.View style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}>
//               <Ionicons name="add-circle-outline" size={size} color={color} />
//             </Animated.View>
//           ),
//         }}
//         listeners={{
//           tabPress: () => animateTabPress(),
//         }}
//       />
//     </Tabs>
//   );
// }



// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: '#6200ee',
//         tabBarInactiveTintColor: '#757575',
//         tabBarStyle: {
//           elevation: 0,
//           borderTopWidth: 1,
//           borderTopColor: '#f0f0f0',
//         },
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'MOVIES',
//           tabBarIcon: ({ size, color }) => (
//             <Ionicons name="film-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="add"
//         options={{
//           title: 'ADD MOVIES',
//           tabBarIcon: ({ size, color }) => (
//             <Ionicons name="add-circle-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }