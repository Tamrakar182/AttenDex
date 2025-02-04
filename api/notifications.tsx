import api, { endpoints } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

interface Notification {
  id: number;
  teacher_subject_id: number;
  title: string;
  details: string;
  created_at: string | null;
  updated_at: string | null;
}

export function useFetchNotifications() {
  return useQuery<Notification[]>({
    queryKey: ['notification'],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ data: Notification[] }>(
          endpoints.notifications.index,
        );
        return data.data;
      } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
      }
    },
  });
}
