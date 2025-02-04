import api, { endpoints } from '@/utils/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

interface EnrolledClass {
  id: number;
  student_id: number;
  teacher_subject_id: number;
  created_at: string;
  updated_at: string;
  teacher_subject: {
    id: number;
    teacher_id: number;
    subject_id: number;
    days_of_week: string;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
    subject: {
      id: number;
      name: string;
      code: string;
      created_at: string;
      updated_at: string;
    };
  };
}

export function useFetchEnrolledClasses(search: string) {
  return useQuery<EnrolledClass[]>({
    queryKey: ['classes', search],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ data: EnrolledClass[] }>(
          endpoints.classes.index,
          {
            params: {
              search,
            },
          },
        );
        return data.data;
      } catch (error) {
        console.error('Error fetching classes list:', error);
        throw error;
      }
    },
  });
}

export function useFetchEnrolledClassesDetails(id: string) {
  return useQuery({
    queryKey: ['classes', id],
    queryFn: async () => {
      try {
        const { data } = await api.get(endpoints.classes.details(id));
        return data;
      } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }
    },
  });
}
export function useMarkAttendance() {
  return useMutation({
    mutationKey: ['attendance'],
    mutationFn: async (data: any) => {
      try {
        const res = await api.post(endpoints.attendance.index, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (res.status == 200) {
          Toast.show({
            type: 'success',
            text1: 'Attendance Marked Successfully',
          });
        }
        return res.data;
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: error.response.data.error,
        });
      }
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
}
export function useMatchFace(id: string) {
  return useMutation({
    mutationKey: ['attendance'],
    mutationFn: async () => {
      try {
        const res = await api.post(endpoints.attendance.index);
        return res.data;
      } catch (error: any) {
        // Log the error to console
        console.error('Error liking food:', error);

        // Throw the error again so React Query can handle it
        throw new Error(
          error.response?.data?.message ||
            'An error occurred while liking the food.',
        );
      }
    },
    onError: (error: any) => {
      // React Query-specific error handling (e.g., notifications)
      console.error('Mutation error:', error);
      alert(
        error.message ||
          'An unexpected error occurred while processing your request.',
      );
    },
    onSuccess: data => {
      // You can do additional success actions here
      console.log('Food liked successfully:', data);
    },
  });
}

export function useFetchRecentAttendance() {
  return useQuery({
    queryKey: ['recent'],
    queryFn: async () => {
      try {
        const { data } = await api.get(endpoints.attendance.recent);
        return data;
      } catch (error) {
        console.error('Error fetching attendances:', error);
        throw error;
      }
    },
  });
}
