import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  // Function to open camera and take a photo
  const openCamera = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      // Launch the camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, // Allow cropping
        aspect: [1, 1], // Square aspect ratio
        quality: 1, // High-quality image
      });

      // If the user takes a photo, update the profile image
      if (!result.canceled) {
        setProfileImage(result.assets[0].uri); // Save the image URI
      }
    } else {
      alert('Camera permission is required to take a photo!');
    }
  };

  const handleCreateAccount = () => {
    console.log('Account Created', {
      studentName,
      email,
      password,
      confirmPassword,
      profileImage,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#0056A1',
          marginBottom: 20,
        }}
      >
        Sign up
      </Text>

      {/* Profile Picture */}
      <TouchableOpacity
        onPress={openCamera}
        style={{ position: 'relative', marginBottom: 20 }}
      >
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : { uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png' }
          }
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#D9E4EC',
          }}
        />
        <Ionicons
          name='camera-outline'
          size={24}
          color='#0056A1'
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: 4,
          }}
        />
      </TouchableOpacity>

      {/* Student Name */}
      <Text
        style={{
          alignSelf: 'flex-start',
          color: '#0056A1',
          fontSize: 14,
          marginBottom: 5,
        }}
      >
        Student Name
      </Text>
      <TextInput
        style={{
          width: '100%',
          height: 50,
          backgroundColor: '#F3F6FB',
          borderRadius: 8,
          paddingHorizontal: 16,
          marginBottom: 15,
          color: '#333333',
        }}
        placeholder='Ram Shrestha'
        placeholderTextColor='#9EA5B1'
        value={studentName}
        onChangeText={setStudentName}
      />

      {/* Email */}
      <Text
        style={{
          alignSelf: 'flex-start',
          color: '#0056A1',
          fontSize: 14,
          marginBottom: 5,
        }}
      >
        Email
      </Text>
      <TextInput
        style={{
          width: '100%',
          height: 50,
          backgroundColor: '#F3F6FB',
          borderRadius: 8,
          paddingHorizontal: 16,
          marginBottom: 15,
          color: '#333333',
        }}
        placeholder='ram@gmail.com'
        placeholderTextColor='#9EA5B1'
        keyboardType='email-address'
        value={email}
        onChangeText={setEmail}
      />

      {/* Password */}
      <Text
        style={{
          alignSelf: 'flex-start',
          color: '#0056A1',
          fontSize: 14,
          marginBottom: 5,
        }}
      >
        Password
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: 50,
          backgroundColor: '#F3F6FB',
          borderRadius: 8,
          paddingHorizontal: 16,
          marginBottom: 15,
        }}
      >
        <TextInput
          style={{ flex: 1, color: '#333333' }}
          placeholder='********'
          placeholderTextColor='#9EA5B1'
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons
            name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color='#9EA5B1'
          />
        </TouchableOpacity>
      </View>

      {/* Create Account Button */}
      <TouchableOpacity
        style={{
          width: '100%',
          height: 50,
          backgroundColor: '#0056A1',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          marginTop: 10,
        }}
        onPress={handleCreateAccount}
      >
        <Text
          style={{
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}
