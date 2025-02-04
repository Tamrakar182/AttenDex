import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useFetchRecentAttendance } from '@/api/attendance';

const Header = () => (
  <View style={styles.header}>
    <Ionicons
      name='arrow-back'
      size={24}
      color='#0065B3'
      style={styles.backButton}
      onPress={() => router.back()}
    />
    <Text style={styles.headerTitle}>Attendance History</Text>
  </View>
);

const AttendanceScreen = () => {
  const { data, isLoading } = useFetchRecentAttendance();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.list}>
        {data.data?.length > 0 ? (
          data.data.map(item => (
            <View key={item.id} style={styles.card}>
              <View style={styles.headerRow}>
                <Text style={styles.date}>{item.created_at}</Text>
                <Text
                  style={[
                    styles.status,
                    {
                      color: item.status === 'present' ? '#00A36C' : '#FF3B30',
                    },
                  ]}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
              <Text style={styles.subject}>{item.subject}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No attendance records found</Text>
        )}
      </ScrollView>
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
    color: '#333',
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
    marginLeft: 10,
  },
  backButton: {
    padding: 8,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AttendanceScreen;
