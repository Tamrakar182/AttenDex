import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/HapticTab';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0065B3',
        headerShown: false,
        tabBarButton: HapticTab,
        animation: 'fade',
        tabBarStyle: {
          paddingHorizontal: 8,
          paddingTop: 5,
          paddingBottom: 18,
          height: 76,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderWidth: 1,
          elevation: 5,
          borderColor: '#c8c8c8',
          position: 'absolute',
          bottom: 0,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Entypo name='home' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='assignment'
        options={{
          title: 'Assignment',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='assignment' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='notification'
        options={{
          title: 'Notification',
          tabBarIcon: ({ color }) => (
            <Ionicons name='notifications' size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='user' size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
