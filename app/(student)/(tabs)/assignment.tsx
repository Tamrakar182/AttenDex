import React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const assigments = [
  {
    title: 'Assignment 1',
    subject: 'Digital Logic',
    dueDate: '10th Dec, 2024',
    status: 'pending',
  },
  {
    title: 'Assignment 2',
    subject: 'Digital Logic',
    dueDate: '15th Dec, 2024',
    status: 'completed',
  },
  {
    title: 'Assignment 3',
    subject: 'Digital Logic',
    dueDate: '20th Dec, 2024',
    status: 'pending',
  },
  {
    title: 'Assignment 4',
    subject: 'Digital Logic',
    dueDate: '25th Dec, 2024',
    status: 'completed',
  },
];

const AssignmentList = () => {
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
        Assignment
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      <FlatList
        data={assigments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              margin: 10,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                marginRight: 10,
                borderRadius: 999,
                backgroundColor: '#0065B3',
                padding: 12,
              }}
            >
              <Feather name='book' size={24} color='white' />
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 16, color: '#666' }}>
                {item.subject}
              </Text>
              <Text style={{ fontSize: 16, color: '#666' }}>
                Due: {item.dueDate}
              </Text>
            </View>
          </View>
        )}
        ListHeaderComponent={<HeaderComponent />}
      />
    </SafeAreaView>
  );
};

export default AssignmentList;
