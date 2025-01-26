import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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

  const logo = require('../../../assets/images/attendexlogowhite.png');
  const profile = require('../../../assets/images/profilepic.png');

  return (
    <View style={{ position: 'relative', flex: 1 }}>
      {/* Header Section */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 250,
          backgroundColor: '#0065B3',
          borderRadius: 6,
        }}
      >
        {/* Logo */}
        <View style={{ marginTop: -60 }}>
          <Image
            source={logo} // Replace with a valid icon path
            style={{
              width: 110,
              alignItems: 'center',
              height: 110,
              justifyContent: 'center',
              paddingLeft: 20,
            }}
            resizeMode='contain'
          />
        </View>

        {/* Icons */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 15,
            gap: 30,
            marginTop: -55,
          }}
        >
          <View>
            <Ionicons
              onPress={() => router.push('/notification')}
              name='notifications'
              size={24}
              color='white'
            />
          </View>
        </View>
      </View>

      {/* Greeting Section */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 15,
          marginTop: -475,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            top: 380,
            left: 30,
            zIndex: 100,
          }}
        >
          <Image
            source={profile} // Replace with your profile image
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#C4C4C6',
              marginRight: 10,
            }}
          />
          <View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              Hi, {userName}!
            </Text>
            <Text
              style={{
                color: '#FFFFFF',
                marginTop: 3,
                fontSize: 20,
              }}
            >
              {greeting}
            </Text>
          </View>
        </View>
      </View>

      {/* Subject Section */}
      <View
        style={{
          padding: 15,
          borderRadius: 10,
          margin: 10,
          marginTop: 500,
        }}
      >
        <Text
          style={{
            paddingLeft: -10,
            color: '#0065B3',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          Subject Name
        </Text>
      </View>

      {/* Buttons Section */}
      <View style={{ margin: 10 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0065B3',
            padding: 15,
            borderRadius: 10,
            marginBottom: 10,
          }}
        //   onPress={() => router.push('/subject/attendancereport')}
        >
          <Entypo name='clock' size={24} color='white' marginleft='12' />
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 'bold',
              marginLeft: 8,
            }}
          >
            Clock IN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0065B3',
            padding: 15,
            borderRadius: 10,
            marginBottom: 1000,
          }}
          onPress={() => router.push('/(student)/(tabs)/assignment')}
        >
          <MaterialIcons name='assignment' size={24} color='white' />
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 'bold',
              marginLeft: 8,
            }}
          >
            Assignment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubjectScreen;
