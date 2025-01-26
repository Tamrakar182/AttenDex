import { User, UserLoginResponseI, UserRegisterResponseI } from '@/types/user';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import api, { endpoints } from '@/utils/api';
import { toast } from 'sonner-native';
import { isAxiosError } from 'axios';

export interface AuthContextData {
  user: User | null;
  signIn: (
    data: { email: string; password: string },
    save: boolean,
  ) => Promise<void>;
  register: (user: {
    name: string;
    email: string;
    phone: string;
    gender: string;
    password: string;
  }) => Promise<void>;
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

  const signIn = async (user: { email: string; password: string }) => {
    setLoading(true);
    try {
      const { data } = await api.post<UserLoginResponseI>(
        endpoints.auth.login,
        user,
      );

      const userData = {
        ...data.data,
        token: data.token,
      };

      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      setUser(userData);
      toast.success('Successfully Logged In');
      router.replace('/');
    } catch (err: any) {
      const { response } = err;

      console.log(err);
      // email doesnt exist
      if (err.toJSON().status === 404) {
        toast.error("User doesn't exist");
        return;
      }

      // password didnt match
      if (err.toJSON().status === 409) {
        toast.error('Invalid Email or Password');
        return;
      }

      // backend error
      if (response && response.data) {
        toast.error(response?.data.message);
        return;
      }

      // generic error
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const register = async (user: {
    name: string;
    email: string;
    phone: string;
    gender: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const { data } = await api.post<UserRegisterResponseI>(
        endpoints.auth.register,
        user,
      );
      const userObj = {
        ...data.user,
        phone_no: data?.user.phone_no ? data.user.phone_no : null,
      };
      setUser({
        ...userObj,
        token: data.token,
      });
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setLoading(false);
      router.replace('/');
      toast.success('Sucessfully Registered User');
    } catch (err: any) {
      if (isAxiosError(err)) {
        const { response } = err;
        if (
          response &&
          response.data &&
          response.data.message === 'Validation errors'
        ) {
          const validationErrors = response.data.data;

          // loop through all validation errors
          Object.keys(validationErrors).forEach(key => {
            validationErrors[key].forEach((message: string) => {
              toast.error(message);
            });
          });
        } else {
          toast.error(response?.data.message);
        }
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (data: User) => {
    try {
      setUser(data);
      toast.success('Profile Updated Successfully');
    } catch (err: any) {
      console.log(err.toJSON());
      toast.error('Something went wrong while updating profile');
    }
  };

  const signOut = async (sendRequest: boolean = true) => {
    try {
      if (sendRequest) {
        // Send request for logout only if sendRequest is true
        await api.get(endpoints.auth.logout);
      }
    } catch (err: any) {
      const { response } = err;
      if (response && response.data) {
        toast.error(response?.data.message);
      }
      console.log(err.toJSON());
      toast.error('Something went wrong while logging out');
    } finally {
      // Logout the user regardless
      setUser(null);
      setLoading(false);
      router.replace('/');
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
