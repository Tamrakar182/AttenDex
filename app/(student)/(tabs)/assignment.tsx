import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFetchAssignments } from '@/api/assignment';

const AssignmentList = () => {
  const { data: assignments, isLoading: assignmentIsLoading } =
    useFetchAssignments();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (url: string, title: string) => {
    try {
      setDownloading(true);
      const fileUri =
        FileSystem.documentDirectory + title.replace(/\s+/g, '_') + '.pdf'; // Save with title
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        fileUri,
      );
      const { uri } = await downloadResumable.downloadAsync();

      Alert.alert('Download Complete', `File saved at: ${uri}`);
    } catch (error) {
      Alert.alert('Download Failed', 'Could not download the file.');
      console.error(error);
    } finally {
      setDownloading(false);
    }
  };

  const handleAssignmentPress = (item: { title: string; url: string }) => {
    Alert.alert(
      'Download Assignment',
      `Do you want to download "${item.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Download',
          onPress: () => handleDownload(item.url, item.title),
        },
      ],
    );
  };

  const HeaderComponent = () => (
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
          marginLeft: 12,
          color: '#000',
        }}
      >
        Assignments
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      <FlatList
        data={assignments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleAssignmentPress(item)}
            style={{ margin: 10 }}
          >
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
                borderRadius: 10,
                elevation: 2, // Shadow for Android
                shadowColor: '#000', // Shadow for iOS
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            >
              <View
                style={{
                  marginRight: 10,
                  borderRadius: 999,
                  backgroundColor: '#0065B3',
                  padding: 8,
                }}
              >
                <Feather name='book' size={24} color='white' />
              </View>
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 16, color: '#666' }}>
                  {item.subject_name}
                </Text>
                <Text style={{ fontSize: 16, color: '#666' }}>
                  Due: {item.deadline}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={<HeaderComponent />}
      />
    </SafeAreaView>
  );
};

export default AssignmentList;
