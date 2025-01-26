import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
// import logo from "../../assets/images/attendexlogowhite.png";
const SubjectScreen = () => {
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const logo = require('../../../assets/images/attendexlogoblue.png');
  const profile = require('../../../assets/images/profilepic.png');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <View
        style={{
          padding: 16,
          backgroundColor: '#0065B3',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
        >
          <Pressable
            hitSlop={30}
            style={pressed => {
              return { opacity: pressed ? 0.5 : 1 };
            }}
            onPress={() => router.back()}
          >
            <Ionicons name='arrow-back' size={24} color='#fff' />
          </Pressable>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#fff',
              marginLeft: 16,
            }}
          >
            Subject Details
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Subject Info Card */}
        <View
          style={{
            margin: 16,
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#0065B3' }}>
            Computer Science
          </Text>
          <Text style={{ fontSize: 16, color: '#666', marginTop: 4 }}>
            Prof. John Doe
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 16,
              alignItems: 'center',
            }}
          >
            <MaterialIcons name='class' size={20} color='#0065B3' />
            <Text style={{ marginLeft: 8, fontSize: 16, color: '#444' }}>
              Class: 12 Science - Section B
            </Text>
          </View>
        </View>

        {/* Class Timing Card */}
        <View
          style={{
            margin: 16,
            marginTop: 0,
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#0065B3',
              marginBottom: 12,
            }}
          >
            Class Schedule
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Ionicons name='time-outline' size={20} color='#0065B3' />
            <Text style={{ marginLeft: 8, fontSize: 16, color: '#444' }}>
              10:00 AM - 11:30 AM
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='calendar-outline' size={20} color='#0065B3' />
            <Text style={{ marginLeft: 8, fontSize: 16, color: '#444' }}>
              Monday, Wednesday, Friday
            </Text>
          </View>
        </View>

        {/* Assignments Card */}
        <View
          style={{
            margin: 16,
            marginTop: 0,
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#0065B3',
              marginBottom: 12,
            }}
          >
            Current Assignments
          </Text>

          <View
            style={{
              backgroundColor: '#f8f8f8',
              padding: 12,
              borderRadius: 8,
              marginBottom: 8,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              Assignment 1
            </Text>
            <Text style={{ color: '#666', marginTop: 4 }}>
              Due: 25th December 2023
            </Text>
          </View>

          <View
            style={{ backgroundColor: '#f8f8f8', padding: 12, borderRadius: 8 }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              Assignment 2
            </Text>
            <Text style={{ color: '#666', marginTop: 4 }}>
              Due: 1st January 2024
            </Text>
          </View>
        </View>

        {/* Attendance Stats */}
        <View
          style={{
            margin: 16,
            marginTop: 0,
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#0065B3',
              marginBottom: 12,
            }}
          >
            Attendance Status
          </Text>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{ fontSize: 24, fontWeight: 'bold', color: '#0065B3' }}
              >
                85%
              </Text>
              <Text style={{ color: '#666' }}>Present</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{ fontSize: 24, fontWeight: 'bold', color: '#ff6b6b' }}
              >
                15%
              </Text>
              <Text style={{ color: '#666' }}>Absent</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Check-in Button */}
      <View style={{ padding: 16, backgroundColor: 'white', elevation: 4 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#0065B3',
            padding: 16,
            borderRadius: 12,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => router.push('/(student)/camera')}
        >
          <Entypo name='clock' size={24} color='white' />
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 8,
            }}
          >
            Check In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SubjectScreen;
