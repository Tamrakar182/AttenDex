import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const ProfileScreen = () => {
  const { signOut, user } = useAuth();
  console.log(user);
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => signOut() },
    ]);
  };

  const profilePic = require('../../../assets/images/profilepic.png');

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View
        style={{
          alignItems: 'center',
          paddingVertical: 40,
          backgroundColor: '#0065B3',
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        <View style={{ marginTop: 50 }}>
          <Image
            source={{
              uri: user.photo
                ? user?.photo
                : 'https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/',
            }}
            style={{
              borderRadius: 50,
              width: 128,
              height: 128,
              marginBottom: 16,
              borderWidth: 2,
              // borderColor: "#D21920",
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 3,
            fontSize: 22,
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: 4,
          }}
        >
          {user?.name}
        </Text>

        {/* <TouchableOpacity
          style={{
            backgroundColor: 'white',
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 8,
          }}
          onPress={() => router.push('/(student)/edit')}
        >
          <Text style={{ color: '#0065B3', fontWeight: 'bold' }}>
            Edit Profile
          </Text>
        </TouchableOpacity> */}
      </View>

      {/* Menu Items */}
      <View style={{ marginTop: 20 }}>
        {/* Notifications */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
          }}
          onPress={() => router.push('/(student)/(tabs)/notification')}
        >
          <Ionicons name='notifications-outline' size={20} color='#0065B3' />
          <Text
            style={{
              flex: 1,
              marginLeft: 20,
              fontSize: 16,
              color: '#333',
            }}
          >
            Notifications
          </Text>
          <Ionicons name='chevron-forward' size={20} color='#888' />
        </TouchableOpacity>

        {/* Attendance */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
          }}
          onPress={() => router.push('/(student)/attendance')}
        >
          <Feather name='check-circle' size={20} color='#0065B3' />
          <Text
            style={{
              flex: 1,
              marginLeft: 20,
              fontSize: 16,
              color: '#333',
            }}
          >
            Attendance
          </Text>
          <Ionicons name='chevron-forward' size={20} color='#888' />
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingVertical: 15,
            paddingHorizontal: 20,
          }}
          onPress={handleLogout}
        >
          <Ionicons name='log-out-outline' size={20} color='red' />
          <Text
            style={{
              flex: 1,
              marginLeft: 20,
              fontSize: 16,
              color: 'red',
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
