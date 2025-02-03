import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, useLocalSearchParams } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFetchEnrolledClassesDetails } from '@/api/classes';

const SubjectScreen = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = useFetchEnrolledClassesDetails(id);
  const logo = require('../../../assets/images/attendexlogoblue.png');
  const profile = require('../../../assets/images/profilepic.png');
  console.log(data);
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#0065B3' />
        <Text style={styles.loadingText}>Loading subject details...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <MaterialIcons name='error-outline' size={48} color='#FF4444' />
        <Text style={styles.errorText}>Failed to load subject details</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!data?.data) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <MaterialIcons name='not-interested' size={48} color='#666666' />
        <Text style={styles.errorText}>No subject data available</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Pressable
            hitSlop={30}
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            onPress={() => router.back()}
          >
            <Ionicons name='arrow-back' size={24} color='#fff' />
          </Pressable>
          <Text style={styles.headerTitle}>Subject Details</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Subject Info Card */}
        <View style={styles.card}>
          <Text style={styles.subjectName}>
            {data.data.subject?.name || 'Untitled Subject'}
          </Text>
          <Text style={styles.teacherName}>
            {data.data.teacher?.name || 'Teacher not assigned'}
          </Text>
        </View>

        {/* Class Timing Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Class Schedule</Text>

          <View style={styles.scheduleItem}>
            <Ionicons name='time-outline' size={20} color='#0065B3' />
            <Text style={styles.scheduleText}>
              {data.data?.start_time}--{data.data?.end_time}
            </Text>
          </View>

          <View style={styles.scheduleItem}>
            <Ionicons name='calendar-outline' size={20} color='#0065B3' />
            <Text style={styles.scheduleText}>
              {data.data?.days_of_week?.map((day: string) => day).join(' ') ||
                'No schedule set'}
            </Text>
          </View>
        </View>

        {/* Assignments Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Assignments</Text>
          {data.data.assignments?.length > 0 ? (
            data.data.assignments.map((assignment, index) => (
              <View key={index} style={styles.assignmentItem}>
                <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                <Text style={styles.assignmentDeadline}>
                  {assignment.deadline}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noAssignments}>No current assignments</Text>
          )}
        </View>
      </ScrollView>

      {/* Check-in Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.checkInButton}
          onPress={() => router.push(`/camera/${data.data.id}`)}
        >
          <Entypo name='clock' size={24} color='white' />
          <Text style={styles.checkInText}>Check In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0065B3',
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    padding: 16,
    backgroundColor: '#0065B3',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    marginTop: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  subjectName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0065B3',
  },
  teacherName: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0065B3',
    marginBottom: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  scheduleText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#444',
  },
  assignmentItem: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  assignmentDeadline: {
    color: '#666',
    marginTop: 4,
  },
  noAssignments: {
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: 'white',
    elevation: 4,
  },
  checkInButton: {
    backgroundColor: '#0065B3',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkInText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default SubjectScreen;
