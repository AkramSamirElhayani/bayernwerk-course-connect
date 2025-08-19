import { Course } from '@/types/api';

// Helper function to map API course to display format
export const mapCourseForDisplay = (course: Course) => {
  return {
    id: course.id,
    title: course.courseName || 'Untitled Course',
    description: course.courseDescription || 'No description available',
    fullDescription: course.courseDescription || 'No detailed description available',
    duration: `${course.duration} hours`,
    level: course.status || 'Beginner',
    image: course.imageUrl || '/placeholder.svg',
    price: course.price,
    category: course.language || 'General',
    lecturer: course.lecturer || 'TBA',
    location: course.location || 'Online',
    available: course.available,
    maxParticipants: course.maxParticipants,
    startDate: course.startDate,
    endDate: course.endDate,
    // Default values for backward compatibility
    objectives: ['Course objectives will be provided'],
    prerequisites: ['Prerequisites will be specified'],
    curriculum: ['Curriculum details available upon request'],
    targetAudience: ['Professionals seeking to enhance their skills'],
  };
};

// Helper to extract unique categories from courses
export const extractCategories = (courses: Course[]): string[] => {
  const categories = courses
    .map(course => course.language || 'General')
    .filter((category, index, arr) => arr.indexOf(category) === index);
  return categories.sort();
};

// Helper to extract unique levels from courses
export const extractLevels = (courses: Course[]): string[] => {
  const levels = courses
    .map(course => course.status || 'Beginner')
    .filter((level, index, arr) => arr.indexOf(level) === index);
  return levels.sort();
};