import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';

const AddAssignment = () => {
  const [assignmentDate] = useState(new Date().toLocaleDateString());
  const [submissionDate, setSubmissionDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString();
      setSubmissionDate(formattedDate);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Header Section */}
      <View
        style={{
          backgroundColor: '#0065B3',
          height: 200,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        }}
      >
        <View style={{ padding: 30 }}>
          <Text
            style={{
              marginTop: 65,
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
            }}
          >
            Hi, User!
          </Text>
          <Text style={{ color: 'white', fontSize: 20 }}>Good Morning</Text>
        </View>
      </View>

      {/* Search Section */}
      <View
        style={{
          marginTop: -20,
          alignSelf: 'center',
          backgroundColor: 'white',
          width: '85%',
          borderRadius: 10,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Ionicons
          name='search'
          size={20}
          color='#C4C4C6'
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholder='Search'
          style={{ flex: 1, fontSize: 16, color: '#333' }}
        />
      </View>

      {/* Add Assignment Section */}
      <Text
        style={{
          color: '#0065B3',
          fontWeight: 'bold',
          fontSize: 18,
          textAlign: 'center',
          marginVertical: 30,
          justifyContent: 'center',
        }}
      >
        Add New Assignment
      </Text>

      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          padding: 15,
          width: '85%',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          marginBottom: 20,
        }}
      >
        {/* Assignment Date */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <FontAwesome
            name='calendar'
            size={24}
            color='#0065B3'
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 16, color: '#333' }}>
            Assignment Date: {assignmentDate}
          </Text>
        </View>

        {/* Submission Date */}
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <FontAwesome
            name='calendar'
            size={24}
            color='#0065B3'
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 16, color: '#333' }}>
            {submissionDate
              ? `Submission Date: ${submissionDate}`
              : 'Choose Submission Date'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode='date'
            display='default'
            onChange={handleDateChange}
          />
        )}

        {/* Title Input */}
        <TextInput
          placeholder='Title'
          style={{
            backgroundColor: '#F9F9F9',
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 10,
            padding: 10,
            fontSize: 16,
            marginBottom: 15,
          }}
        />

        {/* Description Input */}
        <TextInput
          placeholder='Information Regarding the Assignment (Optional)'
          style={{
            backgroundColor: '#F9F9F9',
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 10,
            padding: 10,
            fontSize: 16,
            height: 100,
            textAlignVertical: 'top',
          }}
          multiline
        />

        {/* Continue Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#0065B3',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 20,
          }}
          onPress={() => router.push('/(student)/assignment/[id]')}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddAssignment;
