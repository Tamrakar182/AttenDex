import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFetchNotifications } from '@/api/notifications';

const NotificationScreen = () => {
  const { data: notifications, isLoading, error } = useFetchNotifications();

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size='large' color='#0065B3' />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text>Error fetching notifications</Text>
      </SafeAreaView>
    );
  }

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
          Notifications
        </Text>
      </View>

      {/* No Notifications Message */}
      {notifications?.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 16, color: '#888' }}>
            No notifications available
          </Text>
        </View>
      ) : (
        /* Notification List */
        <FlatList
          data={notifications}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <NotificationItem
              key={item.id}
              title={item.title}
              details={item.details}
              createdAt={item.created_at}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

interface NotificationItemProps {
  title: string;
  details: string;
  createdAt: string | null;
}

const NotificationItem = ({
  title,
  details,
  createdAt,
}: NotificationItemProps) => (
  <View
    style={{
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    }}
  >
    <Text style={{ fontSize: 14, color: '#333', fontWeight: 'bold' }}>
      {title}
    </Text>
    <Text style={{ fontSize: 12, color: '#888', marginVertical: 5 }}>
      {details}
    </Text>
    <Text style={{ fontSize: 12, color: '#aaa' }}>{createdAt}</Text>
  </View>
);

export default NotificationScreen;
