import api, { endpoints } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

interface Assignment {
  id: number;
  title: string;
  url: string;
  deadline: string;
  subject_name: string | null;
}

export function useFetchAssignments() {
  return useQuery<Assignment[]>({
    queryKey: ['assignments'],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ data: Assignment[] }>(
          endpoints.assignments.index,
        );
        return data.data;
      } catch (error) {
        console.error('Error fetching assignments:', error);
        throw error;
      }
    },
  });
}
