import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesApi } from '@/services/api';
import { Course, CourseRequestCommand } from '@/types/api';
import { toast } from 'sonner';

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: coursesApi.getAllCourses,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => coursesApi.getCourseById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCourseRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, request }: { courseId: string; request: Omit<CourseRequestCommand, 'courseId'> }) =>
      coursesApi.submitCourseRequest(courseId, request),
    onSuccess: () => {
      toast.success('Course request submitted successfully!');
      // Optionally invalidate courses to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (error) => {
      console.error('Course request failed:', error);
      toast.error('Failed to submit course request. Please try again.');
    },
  });
};