import api, { endpoints } from '@/utils/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// {
//   "data": [
//       {
//           "id": 4,
//           "student_id": 12,
//           "teacher_subject_id": 1,
//           "created_at": "2025-01-29T15:52:59.000000Z",
//           "updated_at": "2025-01-29T15:52:59.000000Z",
//           "teacher_subject": {
//               "id": 1,
//               "teacher_id": 2,
//               "subject_id": 1,
//               "days_of_week": "[null,\"1\",\"2\",\"3\"]",
//               "start_time": "14:39:00",
//               "end_time": "04:39:00",
//               "created_at": "2025-01-28T10:54:48.000000Z",
//               "updated_at": "2025-01-28T10:54:48.000000Z",
//               "subject": {
//                   "id": 1,
//                   "name": "Digital Logic",
//                   "code": "DSA",
//                   "created_at": "2025-01-28T10:54:17.000000Z",
//                   "updated_at": "2025-01-28T10:54:17.000000Z"
//               }
//           }
//       }
//   ]
// }

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
  console.log(search);
  return useQuery<EnrolledClass[]>({
    queryKey: ['classes', search],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ data: EnrolledClass[] }>(
          endpoints.classes.index,
          {
            params: {
              name: search,
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
