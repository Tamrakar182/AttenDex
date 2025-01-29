import api, { endpoints } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

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
