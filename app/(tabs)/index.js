


import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import { Text, Card, Button, ActivityIndicator, Snackbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MovieService } from '../../services/MovieService';
import { Easing } from 'react-native-reanimated';

export default function MoviesScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const router = useRouter();

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await MovieService.getMovies();
      setMovies(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch movies');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await MovieService.deleteMovie(id);
      await fetchMovies();
    } catch (err) {
      setError('Failed to delete movie');
      setSnackbarVisible(true);
    }
  };

  // Scroll Animation
  const scrollY = new Animated.Value(0);
  const scale = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1.2, 1, 0.8],
    extrapolate: 'clamp',
  });

  // Button Press Animation
  const buttonAnimation = new Animated.Value(1);
  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffcc00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={movies}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => {
          const rotate = scrollY.interpolate({
            inputRange: [-50, 0, 100],
            outputRange: ['5deg', '0deg', '-5deg'],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View style={[styles.cardWrapper, { transform: [{ rotate }] }]}>
              <Card style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <Card.Title title={item.name} subtitle={`Released: ${item.year}`} />
                <Card.Content>
                  <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                  </Text>
                </Card.Content>
                <Card.Actions>
                  <Animated.View style={{ transform: [{ scale: buttonAnimation }] }}>
                    <TouchableOpacity
                      onPress={() => {
                        animateButtonPress();
                        router.push(`/edit/${item._id}`);
                      }}
                      style={styles.editButton}
                    >
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View style={{ transform: [{ scale: buttonAnimation }] }}>
                    <TouchableOpacity
                      onPress={() => {
                        animateButtonPress();
                        handleDelete(item._id);
                      }}
                      style={styles.deleteButton}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </Card.Actions>
              </Card>
            </Animated.View>
          );
        }}
      />
      
      {/* Snackbar for Error Messages */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'Retry',
          onPress: fetchMovies,
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  cardWrapper: {
    marginBottom: 16,
    borderRadius: 12,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  description: {
    color: '#aaa',
    fontSize: 14,
    marginVertical: 8,
  },
  editButton: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: 80,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: 80,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};












// import React, { useEffect, useState } from 'react';
// import { View, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
// import { Text, Card, Button, ActivityIndicator } from 'react-native-paper';
// import { useRouter } from 'expo-router';
// import { MovieService } from '../../services/MovieService';
// import { Easing } from 'react-native-reanimated';

// export default function MoviesScreen() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const router = useRouter();
//   const animatedValue = new Animated.Value(0);

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const fetchMovies = async () => {
//     try {
//       setLoading(true);
//       const data = await MovieService.getMovies();
//       setMovies(data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to fetch movies');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await MovieService.deleteMovie(id);
//       await fetchMovies();
//     } catch (err) {
//       setError('Failed to delete movie');
//     }
//   };

//   // Parallax Scroll Effect
//   const scrollY = new Animated.Value(0);
//   const scale = scrollY.interpolate({
//     inputRange: [-100, 0, 100],
//     outputRange: [1.2, 1, 0.8],
//     extrapolate: 'clamp',
//   });

//   // Button Press Animation
//   const buttonAnimation = new Animated.Value(1);
//   const animateButtonPress = () => {
//     Animated.sequence([
//       Animated.timing(buttonAnimation, {
//         toValue: 0.9,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//       Animated.timing(buttonAnimation, {
//         toValue: 1,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#ffcc00" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//         <Button mode="contained" onPress={fetchMovies} style={styles.retryButton}>
//           Retry
//         </Button>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Animated.FlatList
//         data={movies}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={{ paddingBottom: 16 }}
//         showsVerticalScrollIndicator={false}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: true }
//         )}
//         renderItem={({ item, index }) => {
//           const rotate = scrollY.interpolate({
//             inputRange: [-50, 0, 100],
//             outputRange: ['5deg', '0deg', '-5deg'],
//             extrapolate: 'clamp',
//           });

//           return (
//             <Animated.View
//               style={[styles.cardWrapper, { transform: [{ rotate }] }]}
//             >
//               <Card style={styles.card}>
//                 <Image source={{ uri: item.image }} style={styles.cardImage} />
//                 <Card.Title title={item.name} subtitle={`Released: ${item.year}`} />
//                 <Card.Content>
//                   <Text style={styles.description} numberOfLines={2}>
//                     {item.description}
//                   </Text>
//                 </Card.Content>
//                 <Card.Actions>
//                   <Animated.View style={{ transform: [{ scale: buttonAnimation }] }}>
//                     <TouchableOpacity
//                       onPress={() => {
//                         animateButtonPress();
//                         router.push(`/edit/${item._id}`);
//                       }}
//                       style={styles.editButton}
//                     >
//                       <Text style={styles.buttonText}>Edit</Text>
//                     </TouchableOpacity>
//                   </Animated.View>
//                   <Animated.View style={{ transform: [{ scale: buttonAnimation }] }}>
//                     <TouchableOpacity
//                       onPress={() => {
//                         animateButtonPress();
//                         handleDelete(item._id);
//                       }}
//                       style={styles.deleteButton}
//                     >
//                       <Text style={styles.buttonText}>Delete</Text>
//                     </TouchableOpacity>
//                   </Animated.View>
//                 </Card.Actions>
//               </Card>
//             </Animated.View>
//           );
//         }}
//       />
//     </View>
//   );
// }

// const styles = {
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     padding: 16,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#121212',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   retryButton: {
//     backgroundColor: '#ffcc00',
//   },
//   cardWrapper: {
//     marginBottom: 16,
//     borderRadius: 12,
//   },
//   card: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: 12,
//     padding: 10,
//     overflow: 'hidden',
//   },
//   cardImage: {
//     width: '100%',
//     height: 180,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   description: {
//     color: '#aaa',
//     fontSize: 14,
//     marginVertical: 8,
//   },
//   editButton: {
//     backgroundColor: '#007aff',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//     width: 80,
//     marginRight: 10,
//   },
//   deleteButton: {
//     backgroundColor: '#ff3b30',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//     width: 80,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// };









// import React, { useEffect, useState } from 'react';
// import { View, FlatList } from 'react-native';
// import { Text, Card, Button, ActivityIndicator } from 'react-native-paper';
// import { useRouter } from 'expo-router';
// import { MovieService } from '../../services/MovieService';

// export default function MoviesScreen() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const fetchMovies = async () => {
//     try {
//       setLoading(true);
//       const data = await MovieService.getMovies();
//       setMovies(data);
//       setError(null);
//       console.log('Movies:', data);
//     } catch (err) {
//       setError('Failed to fetch movies');
//       console.error('Error fetching movies:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await MovieService.deleteMovie(id);
//       await fetchMovies();
//     } catch (err) {
//       setError('Failed to delete movie');
//       console.error('Error deleting movie:', err);
//     }
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <Text className="text-red-500 mb-4">{error}</Text>
//         <Button mode="contained" onPress={fetchMovies}>
//           Retry
//         </Button>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-gray-800 p-4">
//       <FlatList
//         data={movies}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <Card className="mb-4 shadow-lg">
//             <Card.Cover source={{ uri: item.image }} />
//             <Card.Title title={item.name} subtitle={`Released: ${item.year}`} />
//             <Card.Content>
//               <Text className="text-gray-700" numberOfLines={2}>
//                 {item.description}
//               </Text>
//             </Card.Content>
//             <Card.Actions>
//               <Button
//                 mode="outlined"
//                 onPress={() => router.push(`/edit/${item._id}`)}
//                 className="border-blue-500 text-blue-500"
//               >
//                 Edit
//               </Button>
//               <Button
//                 mode="contained"
//                 onPress={() => handleDelete(item._id)}
//                 className="bg-red-500 text-white"
//               >
//                 Delete
//               </Button>
//             </Card.Actions>
//           </Card>
//         )}
//         contentContainerStyle={{ paddingBottom: 16 }}
//         showsVerticalScrollIndicator={true}
//       />
//     </View>
//   );
// }
