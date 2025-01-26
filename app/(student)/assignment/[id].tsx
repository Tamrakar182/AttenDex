import React from 'react';
import { View, Text } from 'react-native';

const SuccessScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -90,
      }}
    >
      {/* Icon Container */}
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#d9e8fc',
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 36,
              color: 'green',
              fontWeight: 'bold',
            }}
          >
            ✔
          </Text>
        </View>
      </View>

      {/* Message Text */}
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          marginHorizontal: 20,
          lineHeight: 24,
        }}
      >
        <Text>Assignment is </Text>
        <Text style={{ color: 'green', fontWeight: 'bold' }}>
          Successfully{' '}
        </Text>
        <Text>Added to </Text>
        <Text style={{ color: '#3498db', fontWeight: 'bold' }}>
          Introduction to IT
        </Text>
      </Text>
    </View>
  );
};

export default SuccessScreen;
