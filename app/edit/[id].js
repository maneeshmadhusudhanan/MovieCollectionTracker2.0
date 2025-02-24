import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MovieService } from '../../services/MovieService';

export default function EditMovieScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [movie, setMovie] = useState({
    name: '',
    description: '',
    year: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movie details when component loads
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await MovieService.getMovie(id);
        console.log('Movie', data);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // Handle form submission
  const handleUpdate = async () => {
    try {
      setLoading(true);
      await MovieService.updateMovie(id, movie);
      router.push('/'); // Redirect to movie list after updating
    } catch (err) {
      setError('Failed to update movie');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Movie</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Movie Name"
        value={movie.name}
        onChangeText={(text) => setMovie({ ...movie, name: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={movie.description}
        onChangeText={(text) => setMovie({ ...movie, description: text })}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Release Year"
        value={movie.year.toString()}
        onChangeText={(text) => setMovie({ ...movie, year: Number(text) })}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={movie.image}
        onChangeText={(text) => setMovie({ ...movie, image: text })}
      />

      <Button mode="contained" onPress={handleUpdate} style={styles.button}>
        Update Movie
      </Button>

      <Button
        mode="outlined"
        onPress={() => router.push('/')}
        style={styles.button}
      >
        Cancel
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
