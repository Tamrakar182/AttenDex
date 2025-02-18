import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/user';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import api, { endpoints } from '@/utils/api';
import Toast from 'react-native-toast-message';
import { isAxiosError } from 'axios';

export interface AuthContextData {
  user: User | null;
  signIn: (
    data: { email: string; password: string },
    save: boolean,
  ) => Promise<void>;
  register: (user: FormData) => Promise<void>;
  signOut: (sendRequest?: boolean) => Promise<void>;
  editUser: (data: User) => Promise<void>;
  loading: boolean;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // Load user data from AsyncStorage on app start
    const loadUser = async () => {
      setLoading(true);
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const storedToken = await AsyncStorage.getItem('token');

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          api.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${storedToken}`;
          setUser(parsedUser);
        }
      } catch (error) {
        console.log('Error loading user data from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const saveToStorage = async (userData: User, token: string) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log('Error saving to AsyncStorage:', error);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.log('Error clearing AsyncStorage:', error);
    }
  };

  const signIn = async (user: { email: string; password: string }) => {
    setLoading(true);
    try {
      const { data } = await api.post(endpoints.auth.login, user);

      const userData = {
        ...data.data,
        token: data.token,
      };

      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      setUser(userData);
      await saveToStorage(userData, data.token);

      Toast.show({
        type: 'success',
        text1: 'Successfully Logged In',
      });
      router.replace('/');
    } catch (err: any) {
      const { response } = err;

      console.log(err);
      if (err.toJSON().status === 404) {
        Toast.show({
          type: 'error',
          text1: "User doesn't exist",
        });
        return;
      }

      if (err.toJSON().status === 409) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Email or Password',
        });
        return;
      }

      if (response && response.data) {
        Toast.show({
          type: 'error',
          text1: response?.data.message,
        });
        return;
      }

      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (user: FormData) => {
    setLoading(true);
    try {
      console.log(user);
      const { data } = await api.post(endpoints.auth.register, user);

      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data.student);

      await saveToStorage(data.student, data.token);

      const storedUser = await AsyncStorage.getItem('user');
      Toast.show({
        type: 'success',
        text1: 'Successfully Registered',
      });
      router.replace('/');
    } catch (err: any) {
      if (isAxiosError(err)) {
        const { response } = err;
        console.log(response?.data);
        if (
          response &&
          response.data &&
          response.data.message === 'Validation errors'
        ) {
          const validationErrors = response.data.data;

          Object.keys(validationErrors).forEach(key => {
            validationErrors[key].forEach((message: string) => {
              Toast.show({
                type: 'error',
                text1: message,
              });
            });
          });
        } else {
          Toast.show({
            type: 'error',
            text1: response?.data.message,
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (data: User) => {
    try {
      setUser(data);
      await AsyncStorage.setItem('user', JSON.stringify(data));
      Toast.show({
        type: 'success',
        text1: 'Profile Updated Successfully',
      });
    } catch (err: any) {
      console.log(err.toJSON());
      Toast.show({
        type: 'error',
        text1: 'Something went wrong while updating profile',
      });
    }
  };

  const signOut = async (sendRequest: boolean = true) => {
    try {
      if (sendRequest) {
        await api.get(endpoints.auth.logout);
      }
    } catch (err: any) {
      const { response } = err;
      if (response && response.data) {
        Toast.show({
          type: 'error',
          text1: response?.data.message,
        });
      }
      console.log(err.toJSON());
      Toast.show({
        type: 'error',
        text1: 'Something went wrong while logging out',
      });
    } finally {
      await clearStorage();
      setUser(null);
      setLoading(false);
      router.replace('/login');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        signIn,
        signOut,
        loading,
        register,
        editUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
