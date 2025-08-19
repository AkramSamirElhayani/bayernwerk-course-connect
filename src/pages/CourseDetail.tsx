import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Users, CheckCircle, Target, BookOpen, Award, MapPin, User } from "lucide-react";
import { useCourse } from "@/hooks/useCourses";
import { mapCourseForDisplay } from "@/utils/courseMapper";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: courseData, isLoading, error } = useCourse(id || "");
  
  const course = courseData ? mapCourseForDisplay(courseData) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/courses">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative overflow-hidden rounded-lg mb-8">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                  {course.category}
                </Badge>
              </div>
            </div>

            {/* Course Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">{course.title}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {course.fullDescription}
              </p>
            </div>

            {/* Course Details */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Duration:</span>
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span className="font-medium">Level:</span>
                <span>{course.level}</span>
              </div>
              {courseData?.lecturer && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-5 w-5" />
                  <span className="font-medium">Lecturer:</span>
                  <span>{courseData.lecturer}</span>
                </div>
              )}
              {courseData?.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">Location:</span>
                  <span>{courseData.location}</span>
                </div>
              )}
              {course.price && (
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Award className="h-5 w-5" />
                  <span className="font-medium">Price:</span>
                  <span className="text-lg">€{course.price}</span>
                </div>
              )}
            </div>

            <Separator className="mb-8" />

            {/* Learning Objectives */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Learning Objectives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {course.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Curriculum */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Course Curriculum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {course.curriculum.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            {course.prerequisites.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Target Audience */}
            <Card>
              <CardHeader>
                <CardTitle>Who Should Attend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.targetAudience.map((audience, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Users className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{audience}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Request This Course</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Interested in this training? Submit your information and we'll contact you with details.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {course.price && (
                  <div className="text-center py-4 bg-gradient-to-r from-primary to-energy rounded-lg">
                    <span className="text-2xl font-bold text-primary-foreground">€{course.price}</span>
                    <p className="text-sm text-primary-foreground/80">per participant</p>
                  </div>
                )}

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level:</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <Badge variant="secondary">{course.category}</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <Link to={`/contact?course=${course.id}`}>
                      Request Information
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    No commitment required. We'll contact you with course details and scheduling options.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <h4 className="font-medium">What's Included:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success" />
                      Expert instruction
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success" />
                      Course materials
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success" />
                      Hands-on exercises
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success" />
                      Certificate of completion
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;