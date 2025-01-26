import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const logo = require('../assets/images/attendexlogoblue.png');

  const handleLogin = () => {
    if (username && password) {
      Alert.alert('Login successful');
    } else {
      Alert.alert('Please fill in both fields');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: -60,
      }}
    >
      <View>
        <Image
          source={logo}
          style={{
            width: 100,
            alignItems: 'center',
            height: 100,
            justifyContent: 'center',
          }}
          resizeMode='contain'
        />
      </View>
      {/* Title */}
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: '#044E8C',
            alignItems: 'center',
            marginRight: 8,
          }}
        >
          Sign In
        </Text>
      </View>

      {/* Username Input */}
      <View style={{ width: '100%', marginBottom: 16 }}>
        <Text
          style={{
            color: '#044E8C',
            fontSize: 12,
            fontWeight: 'bold',
            marginLeft: 8,
            borderRadius: 16,
          }}
        >
          Username
        </Text>
        <TextInput
          style={{
            width: '100%',
            height: 48,
            borderRadius: 8,
            marginTop: 20,
            paddingHorizontal: 16,
            fontSize: 16,
            backgroundColor: '#E6EDF4',
          }}
          placeholder='Enter your username'
          placeholderTextColor='#AEABAB'
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Password Field */}
      <View style={{ width: '100%', marginBottom: 24 }}>
        <Text
          style={{
            color: '#044E8C',
            fontWeight: 'bold',
            fontSize: 12,
            marginLeft: 8,
          }}
        >
          Password
        </Text>
        <TextInput
          style={{
            width: '100%',
            height: 48,
            borderRadius: 8,
            paddingHorizontal: 16,
            fontSize: 16,
            marginTop: 20,
            backgroundColor: '#E6EDF4',
          }}
          placeholder='Enter your password'
          secureTextEntry
          placeholderTextColor='#AEABAB'
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity
        onPress={() => router.push('/(student)/(tabs)')}
        style={{
          backgroundColor: '#044E8C',
          width: '100%',
          height: 58,
          borderRadius: 24,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
          Login as Student
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/(teacher)/(tabs)')}
        style={{
          backgroundColor: '#044E8C',
          width: '100%',
          height: 58,
          borderRadius: 24,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
          Login as Teacher
        </Text>
      </TouchableOpacity>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}
      >
        <Text
          style={{
            fontSize: 16,
            color: '#044E8C',
            alignItems: 'center',
            marginRight: 5,
          }}
        >
          Or
        </Text>
      </View>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}
      >
        <Text
          onPress={() => router.push('/(auth)/register')}
          style={{
            fontSize: 15,
            color: '#044E8C',
            alignItems: 'center',
            alignSelf: 'center',
            marginRight: 2,
          }}
        >
          Don't have a account ? Sign Up
        </Text>
      </View>
    </View>
  );
}
