import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
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

export default function AddMovieScreen() {
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await MovieService.addMovie({
        ...values,
        year: parseInt(values.year, 10),
      });
      router.push('/');
    } catch (error) {
      setStatus({ error: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          description: '',
          year: '',
          image: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
          status,
        }) => (
          <View style={styles.form}>
            <TextInput
              label="Movie Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              error={touched.name && errors.name}
              style={styles.input}
            />
            {touched.name && errors.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}

            <TextInput
              label="Description"
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              error={touched.description && errors.description}
              multiline
              numberOfLines={4}
              style={styles.input}
            />
            {touched.description && errors.description && (
              <Text style={styles.error}>{errors.description}</Text>
            )}

            <TextInput
              label="Year"
              value={values.year}
              onChangeText={handleChange('year')}
              onBlur={handleBlur('year')}
              error={touched.year && errors.year}
              keyboardType="numeric"
              style={styles.input}
            />
            {touched.year && errors.year && (
              <Text style={styles.error}>{errors.year}</Text>
            )}

            <TextInput
              label="Image URL"
              value={values.image}
              onChangeText={handleChange('image')}
              onBlur={handleBlur('image')}
              error={touched.image && errors.image}
              style={styles.input}
            />
            {touched.image && errors.image && (
              <Text style={styles.error}>{errors.image}</Text>
            )}

            {status?.error && (
              <Text style={styles.error}>{status.error}</Text>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={isSubmitting}
              style={styles.button}>
              Add Movie
            </Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 16,
  },
  input: {
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 16,
  },
  error: {
    color: '#dc3545',
    fontSize: 12,
    marginBottom: 8,
  },
});