// API Types based on OpenAPI specification

export interface Course {
  id: string;
  courseName: string | null;
  courseDescription: string | null;
  imageUrl: string | null;
  location: string | null;
  language: string | null;
  lecturer: string | null;
  status: string | null;
  price: number;
  available: boolean;
  duration: number;
  maxParticipants: number;
  startDate: string;
  endDate: string;
  requests?: CourseRequest[] | null;
}

export interface CourseRequest {
  id: string;
  courseId: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  notes: string | null;
  createdAt: string;
  course: Course;
}

export interface CourseRequestCommand {
  courseId: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  notes: string | null;
}

// Legacy interface for backward compatibility
export interface LegacyCourse {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  duration: string;
  level: string;
  image: string;
  price?: number;
  category: string;
  objectives: string[];
  prerequisites: string[];
  curriculum: string[];
  targetAudience: string[];
}