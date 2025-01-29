import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import Foundation from '@expo/vector-icons/Foundation';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFetchEnrolledClasses } from '@/api/classes';

interface Props {
  title: string;
  start_time: string;
  end_time: string;
  onPress: () => void;
}

const attendanceHistory = [
  { clockIn: '5th Dec, 7:00 am', location: 'Patan Multiple Campus' },
  { clockIn: '5th Dec, 8:00 am', location: 'Patan Multiple Campus' },
  { clockIn: '5th Dec, 8:40 am', location: 'Patan Multiple Campus' },
];

const ClassCard = ({
  id,
  title,
  start_time,
  end_time,
  onPress,
  code,
}: Props) => (
  <TouchableOpacity
    style={{
      backgroundColor: '#0065B3',
      borderRadius: 16,
      height: 140,
      width: '47%',
      padding: 16,
      justifyContent: 'space-between',
      margin: 5,
    }}
    onPress={onPress}
  >
    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
      {title}
    </Text>
    <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
      Code : {code}
    </Text>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Foundation
        name='clock'
        size={20}
        color='white'
        style={{ marginRight: 8 }}
      />

      <Text style={{ color: 'white', fontSize: 12 }}>
        {start_time}--{end_time}
      </Text>
    </View>
  </TouchableOpacity>
);

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  else if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

export default function HomeScreen() {
  const { data: classes, isLoading: classIsLoading } =
    useFetchEnrolledClasses();
  console.log(classes);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const profilePicture = require('../../../assets/images/profile.png');
  const logo = require('../../../assets/images/attendexlogowhite.png');

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        console.log(user);
        if (!user) {
          router.replace('/login'); // Redirect to login if no user is found
        } else {
          setUserName(JSON.parse(user).name || 'Student'); // Assuming the user object has a 'name' field
        }
      } catch (error) {
        console.error('Error reading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size='large' color='#0065B3' />
      </SafeAreaView>
    );
  }

  const HeaderComponent = () => (
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
            style={{ width: 110, height: 110 }}
            resizeMode='contain'
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 30 }}>
            <Feather name='search' size={24} color='white' />
            <Ionicons
              onPress={() => router.push('/notification')}
              name='notifications'
              size={24}
              color='white'
            />
          </View>
        </View>
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={classes.data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ClassCard
            title={item.subject.name}
            start_time={item.start_time}
            end_time={item.end_time}
            code={item.subject.code}
            onPress={() => router.push(`/(student)/subject/${item.id}`)}
          />
        )}
        ListHeaderComponent={<HeaderComponent />}
        ListFooterComponent={
          <View
            style={{ marginTop: 10, marginBottom: 80, marginHorizontal: 5 }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: 'bold', color: '#0065B3' }}
              >
                Attendance History
              </Text>
              <Link href='/(student)/attendance'>
                <Text style={{ color: '#0065B3' }}>View All</Text>
              </Link>
            </View>
            <View
              style={{
                backgroundColor: '#E6EDF4',
                padding: 10,
                borderRadius: 10,
                margin: 15,
              }}
            >
              {attendanceHistory.map((entry, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                    padding: 10,
                  }}
                >
                  <Ionicons name='time-outline' size={18} color='#0065B3' />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ color: 'black', marginLeft: 8 }}>
                      {entry.clockIn}
                    </Text>
                    <Text style={{ color: 'black', marginLeft: 8 }}>
                      {entry.location}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        }
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}
      />
    </SafeAreaView>
  );
}
