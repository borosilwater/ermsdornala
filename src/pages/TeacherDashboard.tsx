import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Bell, 
  Calendar, 
  FileText, 
  Users, 
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { NewsManager } from '@/components/teacher/NewsManager';
import { AnnouncementManager } from '@/components/teacher/AnnouncementManager';
import { EventManager } from '@/components/teacher/EventManager';
import { ExamResultManager } from '@/components/teacher/ExamResultManager';

const TeacherDashboard = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalStudents: 0,
    pendingGrades: 0,
    upcomingEvents: 0,
    totalAnnouncements: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherStats();
  }, []);

  const fetchTeacherStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch teacher statistics
      const [studentsResult, gradesResult, eventsResult, announcementsResult] = await Promise.all([
        supabase
          .from('exam_results')
          .select('student_id')
          .eq('teacher_id', user.id),
        supabase
          .from('exam_results')
          .select('id')
          .eq('teacher_id', user.id)
          .eq('status', 'pending'),
        supabase
          .from('events')
          .select('id')
          .eq('organizer_id', user.id)
          .gte('event_date', new Date().toISOString()),
        supabase
          .from('announcements')
          .select('id')
          .eq('author_id', user.id)
      ]);

      const uniqueStudents = new Set(studentsResult.data?.map(r => r.student_id) || []);

      setStats({
        totalStudents: uniqueStudents.size,
        pendingGrades: gradesResult.data?.length || 0,
        upcomingEvents: eventsResult.data?.length || 0,
        totalAnnouncements: announcementsResult.data?.length || 0
      });
    } catch (error) {
      console.error('Error fetching teacher stats:', error);
      // Set default stats on error
      setStats({
        totalStudents: 0,
        pendingGrades: 0,
        upcomingEvents: 0,
        totalAnnouncements: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Pending Grades",
      value: stats.pendingGrades,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Upcoming Events",
      value: stats.upcomingEvents,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Announcements",
      value: stats.totalAnnouncements,
      icon: Bell,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Manage your classes, students, and content</p>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
          <span className="hidden sm:inline">Teacher Portal</span>
          <span className="sm:hidden">Teacher</span>
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Management Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Content Management
          </CardTitle>
          <CardDescription>
            Create and manage news, announcements, events, and exam results
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 text-xs sm:text-sm">
              <TabsTrigger value="news" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">News</span>
                <span className="sm:hidden">News</span>
              </TabsTrigger>
              <TabsTrigger value="announcements" className="flex items-center">
                <Bell className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Announcements</span>
                <span className="sm:hidden">Announce</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center col-span-1 sm:col-span-1">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Events</span>
                <span className="sm:hidden">Events</span>
              </TabsTrigger>
              <TabsTrigger value="results" className="flex items-center col-span-1 sm:col-span-1">
                <TrendingUp className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Exam Results</span>
                <span className="sm:hidden">Results</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="news" className="mt-3 sm:mt-6">
              <NewsManager />
            </TabsContent>

            <TabsContent value="announcements" className="mt-3 sm:mt-6">
              <AnnouncementManager />
            </TabsContent>

            <TabsContent value="events" className="mt-3 sm:mt-6">
              <EventManager />
            </TabsContent>

            <TabsContent value="results" className="mt-3 sm:mt-6">
              <ExamResultManager />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;