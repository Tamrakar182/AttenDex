import api, { endpoints } from '@/utils/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useFetchEnrolledClasses() {
  return useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      try {
        const { data } = await api.get(endpoints.classes.index);
        return data;
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
