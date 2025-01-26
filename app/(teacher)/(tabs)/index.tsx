import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import Foundation from '@expo/vector-icons/Foundation';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  title: string;
  section: string;
  time: string;
  onPress: () => void;
}

const classes = [
  {
    id: '1',
    title: 'IIT',
    section: '6th Sem - Sec B',
    time: '6:45-7:30am',
  },
  {
    id: '2',
    title: 'DBMS',
    section: '5th Sem - Sec A',
    time: '8:00-9:30am',
  },
  {
    id: '3',
    title: 'Networks',
    section: '7th Sem - Sec C',
    time: '10:00-11:30am',
  },
  {
    id: '4',
    title: 'Security',
    section: '8th Sem - Sec C',
    time: '6:45-7:30am',
  },
  {
    id: '5',
    title: 'Digital Logic',
    section: '5th Sem - Sec A',
    time: '8:00-9:30am',
  },
  {
    id: '6',
    title: 'Networks',
    section: '7th Sem - Sec C',
    time: '10:00-11:30am',
  },
];

const attendanceHistory = [
  {
    clockIn: '5th Dec, 7:00 am',
    location: 'Patan Multiple Campus',
  },
  {
    clockIn: '5th Dec, 8:00 am',
    location: 'Patan Multiple Campus',
  },
  {
    clockIn: '5th Dec, 8:40 am',
    location: 'Patan Multiple Campus',
  },
];

const ClassCard = ({ title, section, time, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#0065B3',
        borderRadius: 16,
        height: 140,
        width: '47%', // Changed to percentage for better responsiveness
        padding: 16,
        justifyContent: 'space-between',
        margin: 5,
      }}
      onPress={onPress}
    >
      <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
        {title}
      </Text>
      <Text style={{ color: 'white', fontSize: 16 }}>{section}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Foundation
          name='clock'
          size={24}
          color='white'
          style={{ marginRight: 8 }}
        />
        <Text style={{ color: 'white', fontSize: 16 }}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'Good Morning';
  } else if (hour < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
}

export default function HomeScreen() {
  const [userName, setUserName] = useState('Teacher');

  const profilePicture = require('../../../assets/images/profile.png');
  const logo = require('../../../assets/images/attendexlogowhite.png');

  const HeaderComponent = () => {
    return (
      <View>
        <View
          style={{
            backgroundColor: '#0065B3',
            paddingBottom: 120,
            borderRadius: 6,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 15,
            }}
          >
            <Image
              source={logo}
              style={{
                width: 110,
                height: 110,
              }}
              resizeMode='contain'
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 30,
              }}
            >
              <Feather name='search' size={24} color='white' />
              <Ionicons
                onPress={() => router.push('/notification')}
                name='notifications'
                size={24}
                color='white'
              />
            </View>
          </View>

          {/* Profile Section */}
          <View style={{ paddingHorizontal: 30 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={profilePicture}
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
                  style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}
                >
                  Hi, {userName}!
                </Text>
                <Text style={{ color: '#FFFFFF', marginTop: 3, fontSize: 20 }}>
                  {getGreeting()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View
          style={{
            marginTop: -30,
            marginBottom: 20,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            height: 55,
            width: '85%',
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 5,
          }}
        >
          <Feather
            name='search'
            size={24}
            color='#C4C4C6'
            style={{ marginRight: 10 }}
          />
          <Text style={{ color: '#C4C4C6' }}>Search</Text>
        </View>

        <View style={{ paddingHorizontal: 30, marginBottom: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0065B3' }}>
            Today's Classes
          </Text>
          <Text style={{ marginTop: 3, fontSize: 16, color: '#555' }}>
            Today's Date: {new Date().toLocaleDateString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={classes}
        keyExtractor={item => item.title}
        renderItem={({ item }) => (
          <ClassCard
            title={item.title}
            section={item.section}
            time={item.time}
            onPress={() => router.push({
              pathname: '/(teacher)/subject/[id]',
              params: { id: item.id, title: item.title, section: item.section }
            })}
          />
        )}
        ListHeaderComponent={<HeaderComponent />}
        ListFooterComponent={<View style={{ height: 80 }} />}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}
      />
    </SafeAreaView>
  );
}
