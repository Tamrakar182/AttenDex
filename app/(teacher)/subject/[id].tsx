import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

const students = [
  { id: '1', name: 'John Doe', roll: '001' },
  { id: '2', name: 'Jane Smith', roll: '002' },
];

const SubjectScreen = () => {
  const { id, title, section } = useLocalSearchParams();
  const [isModalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const downloadAttendanceReport = (start: Date, end: Date) => {
    Alert.alert('Download Started', `Downloading attendance report from ${start.toDateString()} to ${end.toDateString()}`);
    setModalVisible(false);
  };

  const selectPreset = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    downloadAttendanceReport(start, end);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color='#0065B3' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.sectionText}>{section}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome name='file-pdf-o' size={24} color='white' />
          <Text style={styles.buttonText}>Download Attendance Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(teacher)/(tabs)/assignment')}
        >
          <MaterialIcons name='assignment-add' size={24} color='white' />
          <Text style={styles.buttonText}>Add New Assignment</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date Range</Text>
            
            <View style={styles.datePickerContainer}>
              <TouchableOpacity 
                style={styles.dateButton} 
                onPress={() => setShowStartPicker(true)}
              >
                <Text>Start: {startDate.toDateString()}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.dateButton} 
                onPress={() => setShowEndPicker(true)}
              >
                <Text>End: {endDate.toDateString()}</Text>
              </TouchableOpacity>
            </View>

            {showStartPicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                onChange={(event, date) => {
                  setShowStartPicker(false);
                  if (date) setStartDate(date);
                }}
              />
            )}

            {showEndPicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                onChange={(event, date) => {
                  setShowEndPicker(false);
                  if (date) setEndDate(date);
                }}
              />
            )}

            <View style={styles.presetButtons}>
              <TouchableOpacity 
                style={styles.presetButton} 
                onPress={() => selectPreset(7)}
              >
                <Text>Last 7 Days</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.presetButton} 
                onPress={() => selectPreset(30)}
              >
                <Text>Last 30 Days</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalButton} 
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.downloadButton]} 
                onPress={() => downloadAttendanceReport(startDate, endDate)}
              >
                <Text style={styles.downloadButtonText}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.studentList}>
        <Text style={styles.sectionHeader}>Registered Students</Text>
        <FlatList
          data={students}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.studentCard}>
              <Text style={styles.studentName}>{item.name}</Text>
              <Text style={styles.rollNumber}>Roll: {item.roll}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0065B3',
    marginTop: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  actionButtons: {
    gap: 10,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0065B3',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  studentList: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0065B3',
  },
  studentCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '500',
  },
  rollNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  datePickerContainer: {
    gap: 10,
    marginBottom: 20,
  },
  dateButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  presetButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  presetButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  downloadButton: {
    backgroundColor: '#0065B3',
  },
  downloadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SubjectScreen;
