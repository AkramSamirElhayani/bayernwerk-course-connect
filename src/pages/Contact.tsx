import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useCourses, useCourseRequest } from "@/hooks/useCourses";
import { mapCourseForDisplay } from "@/utils/courseMapper";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("course");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    course: courseId || "",
    message: "",
  });
  
  const { data: coursesData } = useCourses();
  const courseRequestMutation = useCourseRequest();

  useEffect(() => {
    if (courseId) {
      setFormData(prev => ({ ...prev, course: courseId }));
    }
  }, [courseId]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.course && formData.course !== "general") {
      // Submit course request via API
      courseRequestMutation.mutate({
        courseId: formData.course,
        request: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          notes: `Phone: ${formData.phone}\nCompany: ${formData.company}\nPosition: ${formData.position}\n\nMessage: ${formData.message}`,
        }
      }, {
        onSuccess: () => {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            company: "",
            position: "",
            course: "",
            message: "",
          });
        }
      });
    } else {
      // General inquiry - just show success message
      toast.success("Request submitted successfully! We'll contact you within 24 hours.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        course: "",
        message: "",
      });
    }
  };

  const selectedCourse = coursesData?.find(c => c.id === formData.course);
  const mappedSelectedCourse = selectedCourse ? mapCourseForDisplay(selectedCourse) : null;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to advance your career with professional training? Contact us to learn more 
            about our courses or request custom training for your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Course Request Form
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you with course details and scheduling options.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Selected Course Display */}
                  {mappedSelectedCourse && (
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm font-medium text-primary mb-1">Selected Course:</p>
                      <p className="font-semibold">{mappedSelectedCourse.title}</p>
                      <p className="text-sm text-muted-foreground">{mappedSelectedCourse.duration} • {mappedSelectedCourse.level}</p>
                    </div>
                  )}

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Job Title/Position</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => handleChange("position", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Course Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="course">Course of Interest</Label>
                    <Select value={formData.course} onValueChange={(value) => handleChange("course", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        {coursesData?.map(course => {
                          const mapped = mapCourseForDisplay(course);
                          return (
                            <SelectItem key={course.id} value={course.id}>
                              {mapped.title}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your training needs, preferred dates, number of participants, or any specific requirements..."
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={courseRequestMutation.isPending}
                  >
                    {courseRequestMutation.isPending ? "Submitting..." : "Submit Request"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to be contacted by Bayernwerk Academy 
                    regarding your training inquiry.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+49 (0) 941 201-0</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri 8:00-18:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">academy@bayernwerk.de</p>
                    <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">
                      Bayernwerk AG<br />
                      Lilienthalstraße 7<br />
                      93049 Regensburg<br />
                      Germany
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Response</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <p className="text-sm">Usually respond within 2-4 hours</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <p className="text-sm">Course scheduling within 48 hours</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-energy/10 rounded-lg">
                    <div className="w-2 h-2 bg-energy rounded-full"></div>
                    <p className="text-sm">Custom training quotes in 1-2 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;