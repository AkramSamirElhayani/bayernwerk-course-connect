import { Course, CourseRequestCommand } from '@/types/api';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new ApiError(response.status, `API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const coursesApi = {
  // Get all courses
  getAllCourses: async (): Promise<Course[]> => {
    return fetchApi<Course[]>('/api/courses');
  },

  // Get single course by ID
  getCourseById: async (id: string): Promise<Course> => {
    return fetchApi<Course>(`/api/courses/${id}`);
  },

  // Submit course request
  submitCourseRequest: async (courseId: string, request: Omit<CourseRequestCommand, 'courseId'>): Promise<void> => {
    const requestData: CourseRequestCommand = {
      ...request,
      courseId,
    };

    return fetchApi<void>(`/api/courses/${courseId}/requests`, {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  },
};

export { ApiError };