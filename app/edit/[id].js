
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { TextInput, Text, ActivityIndicator } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MovieService } from '../../services/MovieService';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Movie name is required'),
  description: Yup.string().required('Description is required'),
  year: Yup.number()
    .required('Year is required')
    .min(1888, 'Year must be after 1888')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  image: Yup.string().url('Must be a valid URL').required('Image URL is required'),
});

export default function EditMovieScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  const buttonAnimation = useRef(new Animated.Value(1)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonAnimation, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonAnimation, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await MovieService.getMovie(id);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ffcc00" />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeInAnim }]}>
      <ScrollView>
        <Formik
          initialValues={{
            name: movie?.name || '',
            description: movie?.description || '',
            year: movie?.year?.toString() || '',
            image: movie?.image || '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              await MovieService.updateMovie(id, { ...values, year: parseInt(values.year, 10) });
              router.push('/');
            } catch (error) {
              setStatus({ error: 'Failed to update movie' });
            } finally {
              setSubmitting(false);
            }
          }}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, status }) => (
            <View style={styles.form}>
              <TextInput
                label="Movie Name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={touched.name && errors.name}
                style={styles.input}
                theme={{ colors: { primary: '#ffcc00' } }}
                textColor="#ffffff"
              />
              {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

              <TextInput
                label="Description"
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                error={touched.description && errors.description}
                multiline
                numberOfLines={4}
                style={styles.input}
                theme={{ colors: { primary: '#ffcc00' } }}
                textColor="#ffffff"
              />
              {touched.description && errors.description && <Text style={styles.error}>{errors.description}</Text>}

              <TextInput
                label="Year"
                value={values.year}
                onChangeText={handleChange('year')}
                onBlur={handleBlur('year')}
                error={touched.year && errors.year}
                keyboardType="numeric"
                style={styles.input}
                theme={{ colors: { primary: '#ffcc00' } }}
                textColor="#ffffff"
              />
              {touched.year && errors.year && <Text style={styles.error}>{errors.year}</Text>}

              <TextInput
                label="Image URL"
                value={values.image}
                onChangeText={handleChange('image')}
                onBlur={handleBlur('image')}
                error={touched.image && errors.image}
                style={styles.input}
                theme={{ colors: { primary: '#ffcc00' } }}
                textColor="#ffffff"
              />
              {touched.image && errors.image && <Text style={styles.error}>{errors.image}</Text>}

              {status?.error && <Text style={styles.error}>{status.error}</Text>}

              <Animated.View style={{ transform: [{ scale: buttonAnimation }] }}>
                <TouchableOpacity
                  onPress={() => {
                    animateButtonPress();
                    handleSubmit();
                  }}
                  style={styles.updateButton}
                  disabled={isSubmitting}>
                  <Text style={styles.buttonText}>{isSubmitting ? 'Updating...' : 'Update Movie'}</Text>
                </TouchableOpacity>
              </Animated.View>

              <TouchableOpacity onPress={() => router.push('/')} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 14,
  },
  updateButton: {
    backgroundColor: '#ffcc00',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#ffcc00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cancelButton: {
    backgroundColor: '#444',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 18,
  },
  error: {
    color: '#ff4d4d',
    fontSize: 14,
    marginBottom: 8,
  },
});






// import React, { useEffect, useState } from 'react';
// import { View, TextInput, StyleSheet } from 'react-native';
// import { Text, Button, ActivityIndicator } from 'react-native-paper';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { MovieService } from '../../services/MovieService';

// export default function EditMovieScreen() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();

//   const [movie, setMovie] = useState({
//     name: '',
//     description: '',
//     year: '',
//     image: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch movie details when component loads
//   useEffect(() => {
//     const fetchMovie = async () => {
//       try {
//         setLoading(true);
//         const data = await MovieService.getMovie(id);
//         console.log('Movie', data);
//         setMovie(data);
//         setError(null);
//       } catch (err) {
//         setError('Failed to fetch movie details');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMovie();
//   }, [id]);

//   // Handle form submission
//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       await MovieService.updateMovie(id, movie);
//       router.push('/'); // Redirect to movie list after updating
//     } catch (err) {
//       setError('Failed to update movie');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Edit Movie</Text>

//       {error && <Text style={styles.error}>{error}</Text>}

//       <TextInput
//         style={styles.input}
//         placeholder="Movie Name"
//         value={movie.name}
//         onChangeText={(text) => setMovie({ ...movie, name: text })}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Description"
//         value={movie.description}
//         onChangeText={(text) => setMovie({ ...movie, description: text })}
//         multiline
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Release Year"
//         value={movie.year.toString()}
//         onChangeText={(text) => setMovie({ ...movie, year: Number(text) })}
//         keyboardType="numeric"
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Image URL"
//         value={movie.image}
//         onChangeText={(text) => setMovie({ ...movie, image: text })}
//       />

//       <Button mode="contained" onPress={handleUpdate} style={styles.button}>
//         Update Movie
//       </Button>

//       <Button
//         mode="outlined"
//         onPress={() => router.push('/')}
//         style={styles.button}
//       >
//         Cancel
//       </Button>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: '#fff',
//     padding: 12,
//     marginBottom: 15,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   button: {
//     marginTop: 10,
//   },
//   error: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
