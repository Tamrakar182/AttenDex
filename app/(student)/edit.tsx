import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProfile = () => {
  const [name, setName] = useState('John Doe');
  const [username, setUsername] = useState('johndoe12@gmail.com');
  const [bio, setBio] = useState('977982345687');
  const [profilePhoto, setProfilePhoto] = useState(
    require('../../assets/images/profilepic.png'),
  );

  const handleSave = () => {
    console.log('Profile updated:', { name, username, bio });
  };

  const handleChangeProfilePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Camera access is required to change the profile photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfilePhoto({ uri: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header with Back and Save Icons */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          height: 100,
          backgroundColor: '#0065B3',
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ fontSize: 18, paddingLeft: 10 }}>❌</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
          Edit Profile
        </Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={{ fontSize: 18, color: 'red', paddingRight: 10 }}>
            ✔️
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        {/* Profile Picture Section */}
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <Image
            source={profilePhoto}
            style={{
              borderRadius: 64, // Rounded to circle
              width: 128,
              height: 128,
              marginBottom: 16,
              borderWidth: 2,
              borderColor: '#D21920',
            }}
          />
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 8,
            }}
            onPress={handleChangeProfilePhoto}
          >
            <Text style={{ color: '#555' }}>Change Profile Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Name Input */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ color: '#555', marginBottom: 8 }}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              paddingBottom: 8,
              fontSize: 16,
            }}
            placeholder='Change your name'
          />
        </View>

        {/* Username Input */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ color: '#555', marginBottom: 8 }}>Email</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              paddingBottom: 8,
              fontSize: 16,
            }}
            placeholder='Enter your email'
          />
        </View>

        {/* Biography Input */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ color: '#555', marginBottom: 8 }}>Phone Number</Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              paddingBottom: 8,
              fontSize: 16,
            }}
            multiline
            numberOfLines={4}
            placeholder='Enter your phone number'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
