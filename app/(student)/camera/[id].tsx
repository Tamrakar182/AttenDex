import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useMarkAttendance } from '@/api/attendance';
import Toast from 'react-native-toast-message';

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const markAttendance = useMarkAttendance();
  const { id } = useLocalSearchParams();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleCheckIn = async () => {
    if (cameraRef.current && !isProcessing) {
      setIsProcessing(true);
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (!photo) {
          throw new Error('No photo taken');
        }

        // Create FormData object
        const formData = new FormData();

        // Add the image to formData
        const filename = photo.uri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : 'image/jpeg';

        formData.append('image', {
          uri: photo.uri,
          name: filename || 'photo.jpg',
          type: type,
        } as any);

        // Add teacher_subject_id
        formData.append('teacher_subject_id', id);
        // console.log(formData);
        // Send the formData to backend
        await markAttendance.mutateAsync(formData, {
          onSuccess: () => {
            router.back();
          },
        });
      } catch (error) {
        // Alert.alert('Error', 'Failed to take photo. Please try again.');
        console.error('Error taking picture:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Link href='../' style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Link>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.faceGuide} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}
          >
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.checkInButton,
              isProcessing && styles.disabledButton,
            ]}
            onPress={handleCheckIn}
            disabled={isProcessing}
          >
            <Text style={styles.text}>
              {isProcessing ? 'Processing...' : 'Check In'}
            </Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    margin: 64,
    justifyContent: 'flex-end',
  },
  flipButton: {
    alignItems: 'center',
    marginBottom: 15,
  },
  checkInButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9EA5B1',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  faceGuide: {
    position: 'absolute',
    top: '25%',
    left: '15%',
    width: '70%',
    height: '40%',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
  },
});
