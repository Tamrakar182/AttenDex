import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

interface Attendance {
  id: string;
  date: string;
  subject: string;
  status: string;
  time: string;
  location: string;
}

const attendanceRecords: Attendance[] = [
  {
    id: '1',
    date: '5th Dec 2023',
    subject: 'IIT',
    status: 'Present',
    time: '7:00 am',
    location: 'Patan Multiple Campus',
  },
  {
    id: '2',
    date: '5th Dec 2023',
    subject: 'DBMS',
    status: 'Present',
    time: '8:00 am',
    location: 'Patan Multiple Campus',
  },
  {
    id: '3',
    date: '4th Dec 2023',
    subject: 'Networks',
    status: 'Absent',
    time: '10:00 am',
    location: 'Patan Multiple Campus',
  },
  {
    id: '4',
    date: '4th Dec 2023',
    subject: 'Security',
    status: 'Present',
    time: '11:30 am',
    location: 'Patan Multiple Campus',
  },
];

const Header = () => (
  <View style={styles.header}>
    <Pressable hitSlop={30} onPress={() => router.back()} style={styles.backButton}>
      <Ionicons name='arrow-back' size={24} color='#0065B3' />
    </Pressable>
    <Text style={styles.headerTitle}>Attendance History</Text>
  </View>
);

const AttendanceScreen = () => {
  const renderItem = (item: Attendance) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.date}>{item.date}</Text>
        <Text
          style={[
            styles.status,
            { color: item.status === 'Present' ? '#00A36C' : '#FF3B30' },
          ]}
        >
          {item.status}
        </Text>
      </View>
      <Text style={styles.subject}>{item.subject}</Text>
      <View style={styles.detailsRow}>
        <View style={styles.iconText}>
          <Ionicons name='time-outline' size={16} color='#666' />
          <Text style={styles.details}>{item.time}</Text>
        </View>
        <View style={styles.iconText}>
          <Ionicons name='location-outline' size={16} color='#666' />
          <Text style={styles.details}>{item.location}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={attendanceRecords}
        renderItem={item => renderItem(item.item)}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E6EDF4',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0065B3',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  detailsRow: {
    flexDirection: 'column',
    gap: 4,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E6EDF4',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0065B3',
  },
  backButton: {
    padding: 8,
  },
});

export default AttendanceScreen;
