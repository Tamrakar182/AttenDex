import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

const notifications = [
  {
    message: "It's time for the attendance of IIT. Clock in now",
    time: '10 mins ago',
    category: 'attendance',
  },
  {
    message: 'You have an assignment due tomorrow of IIT',
    time: '1 day ago',
    category: 'assignment',
  },
  {
    message:
      'You have a presentation of digital logic scheduled at 5th Dec, 2024',
    time: '4 days ago',
    category: 'presentation',
  },
  {
    message: "It's time for the attendance of IIT. Clock in now",
    time: '8 days ago',
    category: 'attendance',
  },
  {
    message: 'You have an assignment due tomorrow of IIT',
    time: '9 days ago',
    category: 'assignment',
  },
  {
    message:
      'You have a presentation of digital logic scheduled at 5th Dec, 2024',
    time: '9 days ago',
    category: 'presentation',
  },
];

const NotificationScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredNotifications = useMemo(() => {
    if (selectedFilter === 'all') return notifications;
    return notifications.filter(item => item.category === selectedFilter);
  }, [selectedFilter]);

  const groupedNotifications = useMemo(() => {
    const thisWeek: Notification[] = [];
    const older: Notification[] = [];

    filteredNotifications.forEach(notification => {
      if (
        notification.time.includes('days ago') &&
        parseInt(notification.time) >= 7
      ) {
        older.push(notification);
      } else {
        thisWeek.push(notification);
      }
    });

    return [
      { title: 'This Week', data: thisWeek },
      { title: 'Older', data: older },
    ];
  }, [filteredNotifications]);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000',
            marginLeft: 12,
          }}
        >
          Notification
        </Text>
      </View>

      {/* Filter Buttons */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 15,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: selectedFilter === 'all' ? '#0065B3' : '#E0E0E0',
            height: 50,
            width: 93,
            paddingVertical: 8,
            paddingHorizontal: 20,
            borderRadius: 20,
            marginRight: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => setSelectedFilter('all')}
        >
          <Text
            style={{
              color: selectedFilter === 'all' ? '#fff' : '#000',
              fontWeight: 'bold',
            }}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor:
              selectedFilter === 'assignment' ? '#0065B3' : '#E0E0E0',
            paddingVertical: 8,
            paddingHorizontal: 20,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setSelectedFilter('assignment')}
        >
          <Text
            style={{ color: selectedFilter === 'assignment' ? '#fff' : '#000' }}
          >
            Assignment
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notification List */}
      <FlatList
        data={groupedNotifications}
        keyExtractor={item => item.title}
        renderItem={({ item: section }) => (
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 10,
              }}
            >
              {section.title}
            </Text>
            {section.data.map((notification, index) => (
              <NotificationItem
                key={index}
                message={notification.message}
                time={notification.time}
              />
            ))}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

interface Notification {
  message: string;
  time: string;
}

const NotificationItem = ({ message, time }: Notification) => (
  <View
    style={{
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    }}
  >
    <Text style={{ fontSize: 14, color: '#333', marginBottom: 5 }}>
      {message}
    </Text>
    <Text style={{ fontSize: 12, color: '#888' }}>{time}</Text>
  </View>
);

export default NotificationScreen;
