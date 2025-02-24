import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Card, Button, ActivityIndicator } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MovieService } from '../../services/MovieService';

export default function MoviesScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await MovieService.getMovies();
      setMovies(data);
      setError(null);
      console.log('Movies:', data);
    } catch (err) {
      setError('Failed to fetch movies');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await MovieService.deleteMovie(id);
      await fetchMovies();
    } catch (err) {
      setError('Failed to delete movie');
      console.error('Error deleting movie:', err);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 mb-4">{error}</Text>
        <Button mode="contained" onPress={fetchMovies}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-800 p-4">
      <FlatList
        data={movies}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card className="mb-4 shadow-lg">
            <Card.Cover source={{ uri: item.image }} />
            <Card.Title title={item.name} subtitle={`Released: ${item.year}`} />
            <Card.Content>
              <Text className="text-gray-700" numberOfLines={2}>
                {item.description}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="outlined"
                onPress={() => router.push(`/edit/${item._id}`)}
                className="border-blue-500 text-blue-500"
              >
                Edit
              </Button>
              <Button
                mode="contained"
                onPress={() => handleDelete(item._id)}
                className="bg-red-500 text-white"
              >
                Delete
              </Button>
            </Card.Actions>
          </Card>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}
